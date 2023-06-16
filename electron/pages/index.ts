import {BrowserView} from 'electron'
import {Config, getConfig} from '../app/config'
import {mainWindow} from '../main'
import {onRequestCompleted} from './send'
import {pollPendingInstructions} from './executeActions'

let views: BrowserView[] = []

const tabsHeight = 40 + 28

export function startPage(page: Config['pages'][0], index: number) {
  const view = new BrowserView({
    webPreferences: {
      autoplayPolicy: 'no-user-gesture-required',
      nodeIntegration: false,
      offscreen: false,
    },
  })
  view.webContents.setBackgroundThrottling(false)

  // set user agent
  const chromeWindowsUserAgent =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
  view.webContents.setUserAgent(chromeWindowsUserAgent)
  setBounds(view)

  try {
    view.webContents.debugger.attach('1.3')
  } catch (err) {
    console.log('Debugger attach failed: ', err)
  }
  view.webContents.debugger.on('detach', (event, reason) => {
    console.log('Debugger detached due to: ', reason)
  })

  const headersMap = new Map<string, string>()

  view.webContents.debugger.on('message', (event, method, params) => {
    if (method === 'Network.requestWillBeSent') {
      if (!['Fetch', 'XHR'].includes(params.type)) return

      const headers = params.request.headers
      headersMap.set(params.requestId, headers)
    }

    if (method === 'Network.responseReceived') {
      if (!['Fetch', 'XHR'].includes(params.type)) return

      setTimeout(() => {
        view.webContents.debugger
          .sendCommand('Network.getResponseBody', {requestId: params.requestId})
          .then(function (response) {
            const body = response.base64Encoded
              ? Buffer.from(response.body, 'base64').toString()
              : response.body

            onRequestCompleted(
              index,
              view,
              page,
              params.response,
              headersMap.get(params.requestId),
              body
            )
          })
          .catch(function (err) {
            console.log(params.response?.url, params.type, err)
          })
      }, 500)
    }
  })
  view.webContents.debugger.sendCommand('Network.enable')

  views[index] = view

  view.webContents.loadURL(page.startURL)

  setInterval(() => {
    pollPendingInstructions(index, view, page).catch(console.error)
  }, 5000)

  mainWindow.addBrowserView(view)
}

export function startPages() {
  const config = getConfig()

  for (let i = 0; i < config.pages.length; i++) {
    startPage(config.pages[i], i)
  }
}

export function setBounds(view: BrowserView) {
  const {width, height} = mainWindow.getBounds()
  view.setBounds({x: 0, y: tabsHeight, width, height: height - tabsHeight})
}

export function showPage(index: number) {
  const view = views[index]
  if (!view) {
    return
  }
  setBounds(view)
}

export function hidePage(index: number) {
  const view = views[index]
  if (!view) {
    return
  }
  view.setBounds({x: 0, y: 0, width: 0, height: 0})
}
