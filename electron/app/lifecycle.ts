import {app} from 'electron'
import {mainWindow} from '../main'

/**
 * restarts the electron app
 */
export function restartApp() {
  console.log('restarting app...')
  app.relaunch()
}

/**
 * Reset all the cache of mainWindow
 */
export function resetAllNavigationStorageAndCache() {
  console.log('resetting all navigation storage and cache...')
  mainWindow.webContents.session.clearStorageData()
}
