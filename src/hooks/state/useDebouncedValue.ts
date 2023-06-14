import isEqual from 'lodash/isEqual'
import {useEffect, useState} from 'react'

export default function useDebouncedValue<T>(value: T, wait: number): [T, boolean] {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const tid = setTimeout(() => setDebouncedValue(value), wait)
    return () => clearTimeout(tid)
  }, [value])

  const loading = !isEqual(value, debouncedValue)
  return [debouncedValue, loading]
}
