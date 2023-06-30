import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  UserLayout,
  Home,
  About,
  Videos,
  Contact,
  SingleVideo,
  Favorites,
} from './pages/user'
import NotFound from './pages/NotFound'
import {
  CPanel,
  AdminLayout,
  Dashboard,
  Carousel,
  ManageVideo,
  Users,
  Messages,
} from './pages/admin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='carousel' element={<Carousel />} />
          <Route path='videos' element={<ManageVideo />} />
          <Route path='users' element={<Users />} />
          <Route path='messages' element={<Messages />} />
        </Route>
        <Route path='/' element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='videos' element={<Videos />} />
          <Route path='contact' element={<Contact />} />
          <Route path='favorites' element={<Favorites />} />
          <Route path='video/:id' element={<SingleVideo />} />
        </Route>

        <Route path='/cpanel' element={<CPanel />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
