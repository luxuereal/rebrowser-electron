import {Config} from '../App/Config/types'

export interface ElectronAPI {
  restartApp: () => Promise<void>
  getConfig: () => Promise<Config>
  setConfig: (config: Config) => Promise<void>
}

export const electronAPI = (window as any).electronAPI as ElectronAPI
