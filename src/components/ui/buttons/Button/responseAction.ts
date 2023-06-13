import {useState} from 'react'

export enum ButtonClickResponseAction {
  error = 'button_click_response_action_error',
  success = 'button_click_response_action_success',
}

const values = Object.values(ButtonClickResponseAction)

export function useResponseActionStatus() {
  const [responseActionStatus, setStatus] =
    useState<ButtonClickResponseAction | null>(null)

  function setResponseActionStatus(status: any) {
    if (!status) return
    if (status.error) {
      status = ButtonClickResponseAction.error
    }
    if (!values.includes(status)) return
    setStatus(status)
    setTimeout(() => setStatus(null), 500)
  }

  return {
    responseActionStatus,
    setResponseActionStatus,
  }
}
