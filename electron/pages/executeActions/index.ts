import {BrowserView} from 'electron'
import {RebrowserInstruction, RebrowserRequestResponse} from '../types'
import {makeRequest} from './makeRequest'
import axios from 'axios'
import {Config} from '../../app/config'

export async function executeInstructions(
  index: number,
  view: BrowserView,
  instructions: RebrowserInstruction[]
) {
  for (const instruction of instructions) {
    try {
      for (const action of instruction.actions) {
        if (action.type === 'makeRequest') {
          await makeRequest(index, view, action)
        }
      }
    } catch (error) {
      console.log(`Error while executing instruction: ${error}`)
    }
  }
}

export async function pollPendingInstructions(
  index: number,
  view: BrowserView,
  page: Config['pages'][0]
) {
  const result = await axios<RebrowserRequestResponse>({
    url: page.endpointURL,
    method: 'get',
    headers: {
      Authorization: `Bearer ${page.endpointAuthenticationToken}`,
    },
  })
  if (result.data.instructions) {
    await executeInstructions(index, view, result.data.instructions)
  }
}
