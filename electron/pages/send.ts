import axios from 'axios'
import {Config} from '../app/config'
import {RebrowserRequestResponse} from './types'
import {BrowserView} from 'electron'
import {addHistoryEntry} from './history'
import {executeInstructions} from './executeActions'

export async function onRequestCompleted(
  index: number,
  view: BrowserView,
  page: Config['pages'][0],
  response: any,
  requestHeaders: any,
  body: string
) {
  try {
    const data = {
      url: response.url,
      body: body,
      status: response.status,
      page: page.name,
    }

    addHistoryEntry(index, {
      ...data,
      headers: requestHeaders,
    })

    console.log(`Will send request to endpoint ${page.endpointURL}`)
    const result = await axios<RebrowserRequestResponse>({
      url: page.endpointURL,
      method: 'post',
      data,
      headers: {
        Authorization: `Bearer ${page.endpointAuthenticationToken}`,
      },
    })

    console.log(
      `Response from endpoint ${page.endpointURL}: ${JSON.stringify(
        result.data
      )}`
    )

    if (result.data.instructions) {
      await executeInstructions(index, view, result.data.instructions)
    }
  } catch (error) {
    console.log(
      `Error while sending request to endpoint ${page.endpointURL}: ${error}`
    )
  }
}
