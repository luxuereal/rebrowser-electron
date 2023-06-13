import classNames from 'classnames'

export interface Props {
  color?:
    | 'white'
    | 'gray'
    | 'black'
    | 'blue'
    | 'green'
    | 'red'
    | 'yellow'
    | 'primary'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export default function SpinnerLoading(props: Props) {
  const color = props.color || 'gray'
  return (
    <svg
      className={classNames(props.className, {
        'h-5 w-5': !props.size || props.size === 'sm',
        'h-6 w-6': props.size === 'md',
        'h-8 w-8': props.size === 'lg',
        'h-10 w-10': props.size === 'xl',
        'animate-spin': true,
        'text-white': color === 'white',
        'text-gray-500': color === 'gray',
        'text-blue-500': color === 'blue' || color === 'primary',
        'text-green-500': color === 'green',
        'text-red-500': color === 'red',
        'text-yellow-500': color === 'yellow',
        'text-black': color === 'black',
      })}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  )
}
