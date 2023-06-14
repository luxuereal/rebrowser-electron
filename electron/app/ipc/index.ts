import {ipcMain} from 'electron'
import {restartApp} from '../lifecycle'
import {getConfig, setConfig} from '../config'

export const handles = {
  restartApp: restartApp,
  getConfig: getConfig,
  setConfig: setConfig,
}

export function initIpc() {
  for (const handle in handles) {
    const func = handles[handle]
    ipcMain.handle(handle, (event, ...args) => func(...args))
  }
}
