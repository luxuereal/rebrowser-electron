import {useLocation, useSearchParams} from 'react-router-dom'

export function useSearchParam(
  key: string,
  defaultValue?: string
): [string, (value: string) => void] {
  const location = useLocation()

  const setSearchParam = useSearchParams(location.search)[1]
  const searchParams = new URLSearchParams(location.search)

  const value = searchParams.get(key) || defaultValue

  const setValue = (value: string) => {
    if (value === undefined || value === null) {
      searchParams.delete(key)
    } else {
      searchParams.set(key, value)
    }
    setSearchParam(searchParams)
  }

  return [value, setValue]
}

export function getSearchParam(key: string) {
  const searchParams = new URLSearchParams(window.location.search)
  return searchParams.get(key)
}
