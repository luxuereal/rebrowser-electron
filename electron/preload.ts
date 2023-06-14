const {contextBridge, ipcRenderer} = require('electron')

const invokes = ['restartApp', 'getConfig', 'setConfig']

const channels = {}

for (const invoke of invokes) {
  channels[invoke] = (...args) => ipcRenderer.invoke(invoke, ...args)
}

contextBridge.exposeInMainWorld('electronAPI', channels)
