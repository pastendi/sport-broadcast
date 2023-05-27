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
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
