import {Route, Routes} from 'react-router-dom'
import Layout from './Layout'
import ConfigIndex from './Config'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/config" element={<ConfigIndex />} />
      </Routes>
    </Layout>
  )
}
