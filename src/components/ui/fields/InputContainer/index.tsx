import {FieldProps} from 'simple-react-form'

export interface Props extends FieldProps {
  className?: string
  label?: React.ReactNode
  children: React.ReactNode
  errorMessage?: string
  description?: React.ReactNode
}

export default function InputContainer(props: Props) {
  return (
    <div className={props.className}>
      {props.label && (
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-white">
          {props.label}
        </label>
      )}
      {props.children}
      {props.errorMessage ? (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {props.errorMessage}
        </p>
      ) : null}
      {props.description ? (
        <p className="mt-2 text-sm text-gray-500" id="email-description">
          {props.description}
        </p>
      ) : null}
    </div>
  )
}
