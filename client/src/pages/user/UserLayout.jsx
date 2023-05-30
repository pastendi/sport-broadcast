import { Outlet } from 'react-router'
import UserNav from '../../components/UserNav'
import Footer from '../../components/Footer'
import RegisterModal from '../../components/RegisterModal'
import LoginModal from '../../components/LoginModal'
import { useSelector } from 'react-redux'

const UserLayout = () => {
  const storeData = useSelector((store) => store.app)
  const { showLoginModal, showRegisterModal } = storeData
  return (
    <div>
      {showLoginModal && <LoginModal />}
      {showRegisterModal && <RegisterModal />}
      <UserNav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default UserLayout
