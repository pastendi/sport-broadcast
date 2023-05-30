import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  UserLayout,
  Home,
  About,
  Videos,
  Contact,
  SingleVideo,
  LiveVideo,
  Favorites,
} from './pages/user'
import NotFound from './pages/NotFound'
import CPanel from './pages/admin/CPanel'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='videos' element={<Videos />} />
          <Route path='contact' element={<Contact />} />
          <Route path='favorites' element={<Favorites />} />
          <Route path='video/:id' element={<SingleVideo />} />
          <Route path='live/:id' element={<LiveVideo />} />
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path='/cpanel' element={<CPanel />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
