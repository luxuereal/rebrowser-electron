import {useParams} from 'react-router-dom'
import {useEffect} from 'react'
import {electronAPI} from '../../api'

export default function Page() {
  const {pageIndex} = useParams()

  useEffect(() => {
    electronAPI.showPage(Number(pageIndex))
    return () => {
      electronAPI.hidePage(Number(pageIndex))
    }
  }, [pageIndex])

  return <div>{/* <pre>{JSON.stringify(page, null, 2)}</pre> */}</div>
}
