import { Outlet } from 'react-router'
import UserNav from '../../components/UserNav'
import Footer from '../../components/Footer'
import RegisterModal from '../../components/RegisterModal'
import LoginModal from '../../components/LoginModal'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const UserLayout = () => {
  const storeData = useSelector((store) => store.app)
  const { showLoginModal, showRegisterModal } = storeData
  return (
    <div>
      <ToastContainer position='bottom-right' autoClose={3000} />
      {showLoginModal && <LoginModal />}
      {showRegisterModal && <RegisterModal />}
      <UserNav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default UserLayout
