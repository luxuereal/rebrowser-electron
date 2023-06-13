import classNames from 'classnames'
import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import SpinnerLoading from '../../loadings/Spinner'
import {
  ButtonClickResponseAction,
  useResponseActionStatus,
} from './responseAction'

export interface ButtonProps {
  icon?: React.ElementType
  children?: React.ReactNode

  /**
   * If you return on the onClick function a promise, the button will show a loading state.
   *
   * To show a error indicator (shake) you can:
   *   - return a rejected promise
   *   - throw an error
   *   - return a object with the property `error` set to a truthy value
   *   - return the enum value `ButtonClickResponseAction.error`
   */
  onClick?: () => any
  to?: string
  disabled?: boolean
  loading?: boolean
  confirmText?: React.ReactNode
  buttonType?: 'button' | 'submit' | 'reset'

  /**
   * Pass a key event that will trigger the button click
   */
  clickOnKey?: string

  // desing
  className?: string
  primary?: boolean
  danger?: boolean
  success?: boolean
  slate?: boolean
  full?: boolean
  small?: boolean
  big?: boolean
  dark?: boolean
  style?: React.CSSProperties
}

export interface ButtonRef {
  onClick: () => any
  click: () => any
  setOnClick: (onClick: () => any) => void
}

export type ButtonStyleProps =
  | 'disabled'
  | 'slate'
  | 'primary'
  | 'danger'
  | 'success'
  | 'dark'
export type ButtonSizeProps = 'small' | 'big' | 'full'

export function getButtonStyle(props: Pick<ButtonProps, ButtonStyleProps>) {
  const style = props.disabled
    ? 'disabled'
    : props.slate
    ? 'slate'
    : props.success
    ? 'success'
    : props.primary
    ? 'primary'
    : props.dark
    ? 'dark'
    : props.danger
    ? 'danger'
    : 'default'
  return style
}

export function getButtonClassName(
  props: Pick<ButtonProps, ButtonStyleProps | ButtonSizeProps | 'className'>,
  loading = false,
  responseActionStatus?: ButtonClickResponseAction | null
) {
  const style = getButtonStyle(props)
  const size = props.small ? 'small' : props.big ? 'big' : 'default'
  const hasWhiteText =
    style === 'primary' ||
    style === 'danger' ||
    style === 'slate' ||
    style === 'success' ||
    style === 'dark'

  return classNames(
    'border shadow-sm rounded-md',
    'font-medium',
    'transition ease-in-out duration-150',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    {
      'px-4 py-2 text-sm': size === 'default',
      'px-4 py-1 text-sm': size === 'small',
      'px-5 py-3 text-md': size === 'big',

      'cursor-not-allowed': props.disabled,
      'w-full': props.full,

      'border-gray-300 text-gray-400': style === 'disabled',
      'border-gray-300 text-gray-700': style === 'default',
      'border-transparent text-white': hasWhiteText,

      'focus:ring-gray-300': style === 'default',
      'focus:ring-blue-500': style === 'primary',
      'focus:ring-red-500': style === 'danger',
      'focus:ring-slate-500': style === 'slate',
      'focus:ring-green-500': style === 'success',

      'bg-gray-200': style === 'disabled',
      'bg-white': style === 'default',
      'bg-red-600': style === 'danger',
      'bg-blue-600': style === 'primary',
      'bg-black': style === 'dark',
      'bg-slate-600': style === 'slate',
      'bg-green-600': style === 'success',

      'hover:bg-gray-50': !loading && style === 'default',
      'hover:bg-gray-700': !loading && style === 'dark',
      'hover:bg-blue-700': !loading && style === 'primary',
      'hover:bg-red-700': !loading && style === 'danger',
      'hover:bg-slate-700': !loading && style === 'slate',
      'hover:bg-green-700': !loading && style === 'success',

      // response action states
      'animate-shake': responseActionStatus === ButtonClickResponseAction.error,
    },
    props.className
  )
}

function Button(props: ButtonProps, ref: React.Ref<ButtonRef>) {
  const [loadingState, setLoading] = useState(false)
  const buttonRef = useRef()
  const loading = props.loading || loadingState
  const [confirm, setConfirm] = useState(false)
  const overrideOnClickRef = useRef<() => any>()
  const [formId, internalSetFormId] = useState<string | null>(null)
  const navigate = useNavigate()
  const {responseActionStatus, setResponseActionStatus} =
    useResponseActionStatus()

  const onClick = async () => {
    if (props.disabled || loading) return

    if (props.confirmText) {
      if (confirm) {
        setConfirm(false)
      } else {
        setConfirm(true)
        return
      }
    }

    setLoading(true)
    let result: ButtonClickResponseAction | null = null

    try {
      if (overrideOnClickRef.current) {
        result = await overrideOnClickRef.current()
      } else {
        if (props.onClick) {
          result = await props.onClick()
        } else if (props.to) {
          navigate(props.to)
        }
      }
    } catch (error) {
      console.error('Uncaught error inside button onClick', error)
      result = ButtonClickResponseAction.error
    }

    // check if button is mounted
    if (buttonRef.current) {
      setLoading(false)
    }

    setResponseActionStatus(result)
  }

  const setOnClick = (onClick: () => any) => {
    overrideOnClickRef.current = onClick
  }

  const setFormId = (formId: string) => {
    internalSetFormId(formId)
  }

  useImperativeHandle(ref, () => ({
    onClick,
    setOnClick,
    setFormId,
    click: onClick,
  }))

  const style = getButtonStyle(props)
  const className = getButtonClassName(props, loading, responseActionStatus)

  return (
    <button
      ref={buttonRef}
      form={formId}
      type={props.buttonType || 'submit'}
      disabled={props.disabled || loading}
      onClick={onClick}
      style={props.style || {}}
      className={className}>
      <div className="flex items-center justify-center space-x-3">
        {loading ? (
          <SpinnerLoading
            className=""
            aria-hidden="true"
            color={style === 'default' ? 'gray' : 'white'}
          />
        ) : props.icon ? (
          <div className="-mx-1 flex h-5 items-center justify-center">
            <props.icon className="h-5 w-4" aria-hidden="true" />
          </div>
        ) : (
          <div className="-mr-3 h-5"></div>
        )}
        {props.children && (
          <div className="">{confirm ? props.confirmText : props.children}</div>
        )}
      </div>
    </button>
  )
}

export default forwardRef(Button)
