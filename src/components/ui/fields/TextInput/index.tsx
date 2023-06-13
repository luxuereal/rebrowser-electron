import {FieldProps} from 'simple-react-form'
import {ExclamationCircleIcon} from '@heroicons/react/24/solid'
import {InputHTMLAttributes, useEffect, useRef} from 'react'
import InputContainer from '../InputContainer'
import classNames from 'classnames'

export type TextInputProps = {
  inputType?: string
  appendContent?: React.ReactNode
  onBlur?: () => any
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => any
  className?: string
  autoFocus?: boolean
  disabled?: boolean
  inputClassName?: string
  containerClassName?: string
  placeholder?: string
  description?: string
  maxLength?: number
  autoComplete?: string
  inputMode?: InputHTMLAttributes<any>['inputMode']
}

export default function TextInput(props: FieldProps<string, TextInputProps>) {
  const input = useRef(null)

  useEffect(() => {
    if (!input.current) return () => {}
    if (props.autoFocus) {
      input.current.focus()
    }
  }, [])

  return (
    <InputContainer {...props}>
      <div
        className={classNames(
          'relative flex rounded-md shadow-sm',
          props.containerClassName
        )}>
        <input
          ref={input}
          disabled={props.disabled}
          type={props.inputType || 'text'}
          name={props.fieldName}
          id={props.fieldName}
          value={props.value || ''}
          inputMode={props.inputMode}
          maxLength={props.maxLength}
          onBlur={props.onBlur}
          onKeyDown={props.onKeyDown}
          onChange={event => props.onChange(event.target.value)}
          className={classNames(
            props.inputClassName,
            'block w-full flex-1 rounded-md border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
            {
              'bg-gray-100 text-gray-500': props.disabled,
            }
          )}
          placeholder={props.placeholder}
        />
        {props.appendContent && (
          <div className="absolute inset-y-0 right-0 z-10 flex items-center pr-3">
            <span className="text-gray-500 dark:text-white sm:text-sm">
              {props.appendContent}
            </span>
          </div>
        )}
        {props.errorMessage ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        ) : null}
      </div>
    </InputContainer>
  )
}
