import {Route, Routes} from 'react-router-dom'
import Layout from './Layout'
import ConfigIndex from './Config'
import Page from './Page'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/page/:pageIndex" element={<Page />} />
        <Route path="/config" element={<ConfigIndex />} />
      </Routes>
    </Layout>
  )
}
