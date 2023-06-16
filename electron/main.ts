import {app, BrowserWindow, powerSaveBlocker} from 'electron'
import * as path from 'path'
import * as isDev from 'electron-is-dev'
import {initIpc} from './app/ipc'
import {startPages} from './pages'

export let mainWindow: BrowserWindow | null = null
let powerSaveBlockerId = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.resolve(__dirname, 'preload.js'),
    },
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:5149/index.html')
  } else {
    // 'build/index.html'
    mainWindow.loadURL(`file://${__dirname}/../index.html`)
  }

  mainWindow.on('closed', () => {
    mainWindow = null
    if (powerSaveBlockerId) {
      powerSaveBlocker.stop(powerSaveBlockerId)
    }
  })

  // Hot Reloading
  if (isDev) {
    // 'node_modules/.bin/electronPath'
    require('electron-reload')(__dirname, {
      electron: path.join(
        __dirname,
        '..',
        '..',
        'node_modules',
        '.bin',
        'electron'
      ),
      forceHardReset: true,
      hardResetMethod: 'exit',
    })
  }

  if (isDev) {
    // mainWindow.webContents.openDevTools();
  }

  powerSaveBlockerId = powerSaveBlocker.start('prevent-app-suspension')
}

app.on('ready', () => {
  initIpc()
  createWindow()
  setTimeout(startPages, 1000)
})

app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  app.quit()
  // }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
