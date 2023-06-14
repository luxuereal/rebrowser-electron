import {app} from 'electron'

/**
 * restarts the electron app
 */
export function restartApp() {
  console.log('restarting app...')
  app.relaunch()
}
