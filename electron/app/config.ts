import Store from 'electron-store'

export interface Config {
  pages: {
    name: string
    startURL: string
    endpointURL: string
    endpointAuthenticationToken: string
  }[]
}

const store = new Store()

export async function setConfig(config: any) {
  store.set('config', config)
}

export function getConfig() {
  const config = store.get('config', {pages: []}) as Config
  return config
}
