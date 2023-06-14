import {useCallback, useEffect, useRef, useState} from 'react'
import throttle from 'lodash/throttle'

function useThrottleCallback(cb: Function, delay: number) {
  const options = {leading: true, trailing: true} // add custom lodash options
  const cbRef = useRef(cb)
  // use mutable ref to make useCallback/throttle not depend on `cb` dep
  useEffect(() => {
    cbRef.current = cb
  })
  return useCallback(
    throttle((...args) => cbRef.current(...args), delay, options),
    [delay]
  )
}

export default function useThrottleState(initialValue: any, wait: number) {
  const [throttleValue, setThrottleValue] = useState(initialValue)

  const setValue = useThrottleCallback(setThrottleValue, wait)

  return [throttleValue, setValue]
}
