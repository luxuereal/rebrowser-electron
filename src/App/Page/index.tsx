import {useParams} from 'react-router-dom'
import {usePageConfig} from '../Config/types'

export default function Page() {
  const {pageIndex} = useParams()
  const page = usePageConfig(pageIndex)
  return (
    <div>
      <pre>{JSON.stringify(page, null, 2)}</pre>
    </div>
  )
}
