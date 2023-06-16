export interface RebrowserAction {
  type: 'navigate' | 'makeRequest'
  requestMethod?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  requestBody?: string
  requestHeaders?: any
  takeHeadersFromRequestThatStartsWith?: string
  url?: string
}

export interface RebrowserInstruction {
  _id: string
  actions: RebrowserAction[]
}

export interface RebrowserRequestResponse {
  instructions: RebrowserInstruction[]
}
