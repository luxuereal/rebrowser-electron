import {Config} from '../App/Config/types'

export interface ElectronAPI {
  restartApp: () => Promise<void>
  getConfig: () => Promise<Config>
  setConfig: (config: Config) => Promise<void>
  showPage: (index: number) => Promise<void>
  hidePage: (index: number) => Promise<void>
  resetAllNavigationStorageAndCache: () => Promise<void>
}

export const electronAPI = (window as any).electronAPI as ElectronAPI
