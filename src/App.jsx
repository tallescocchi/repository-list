import { Route, Routes } from 'react-router-dom'

import { Home } from './pages/Home'
import { Repository } from './pages/Repository'

import Global from './styles/Global'

export default function App() {
  return (
    <>
      <Global />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/repository?/:repository" element={<Repository />} />
      </Routes>
    </>
  )
}
