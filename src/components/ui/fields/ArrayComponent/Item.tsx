import {ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/24/outline'
import {useState} from 'react'

export default function Item(props) {
  const {label, index, defaultShow = false, children} = props
  const [show, setShow] = useState(defaultShow)

  return (
    <div>
      <div onClick={() => setShow(!show)}>
        <div>{label ? label : `#${index + 1}`}</div>
        <div>{show ? <ChevronUpIcon /> : <ChevronDownIcon />}</div>
      </div>
      {show ? <div>{children}</div> : null}
    </div>
  )
}
