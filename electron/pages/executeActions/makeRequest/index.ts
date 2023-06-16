import {BrowserView} from 'electron'
import {RebrowserAction} from '../../types'
import {getHistory} from '../../history'

export async function makeRequest(
  index: number,
  view: BrowserView,
  action: RebrowserAction
) {
  console.log(`Will make request ${JSON.stringify(action)}`)
  const headers = getHeaders(index, action)

  const params = {
    method: action.requestMethod || 'GET',
    headers: {
      ...headers,
      ...action.requestHeaders,
    },
    body: action.requestBody || null,
  }
  const code = `fetch("${action.url}", ${JSON.stringify(params)})`

  console.log(`Will execute code ${code}`)

  await view.webContents.executeJavaScript(code)
}

function getHeaders(index: number, action: RebrowserAction) {
  if (!action.takeHeadersFromRequestThatStartsWith) return {}

  const history = getHistory(index)

  for (let index = history.length - 1; index >= 0; index--) {
    const point = history[index]
    if (point.url.startsWith(action.takeHeadersFromRequestThatStartsWith)) {
      return point.headers
    }
  }

  throw new Error('No request found to take headers')
}
