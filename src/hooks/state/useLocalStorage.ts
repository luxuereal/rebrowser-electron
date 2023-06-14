// REF: https://usehooks.com/useLocalStorage/

import {useEffect, useState} from 'react'

// Hook
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prevData: T) => T)) => void] {
  function getInitalState() {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.log(error)
      return initialValue
    }
  }
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(getInitalState)
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((prevData: T) => T)) => {
    try {
      // Save state
      setStoredValue(oldValue => {
        const valueToStore = value instanceof Function ? value(oldValue) : value
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
        return valueToStore
      })
      // Save to local storage
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error)
    }
  }

  useEffect(() => {
    setStoredValue(getInitalState())
  }, [key])

  return [storedValue, setValue]
}
