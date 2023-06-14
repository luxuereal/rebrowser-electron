import {EyeSlashIcon, EyeIcon} from '@heroicons/react/24/solid'
import {useState} from 'react'
import TextInput, {TextInputProps} from '../TextInput'
import {FieldProps} from 'simple-react-form'

export default function PasswordInput(
  props: FieldProps<string, TextInputProps & {allowSee?: string}>
) {
  const [visible, setVisible] = useState(false)
  return (
    <TextInput
      {...props}
      inputType={visible ? 'text' : 'password'}
      appendContent={
        props.allowSee && (
          <button
            type="button"
            className="duration-50 flex items-center text-gray-500 transition-colors hover:text-gray-800"
            onClick={() => setVisible(!visible)}>
            {visible ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        )
      }
    />
  )
}
