import {app, BrowserWindow} from 'electron'
import * as path from 'path'
import * as isDev from 'electron-is-dev'
import {initIpc} from './app/ipc'

let win: BrowserWindow | null = null

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.resolve(__dirname, 'preload.js'),
    },
  })

  if (isDev) {
    win.loadURL('http://localhost:5149/index.html')
  } else {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`)
  }

  win.on('closed', () => (win = null))

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
    // win.webContents.openDevTools();
  }
}

app.on('ready', () => {
  initIpc()
  createWindow()
})

app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  app.quit()
  // }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
