import logo from '../assets/logo.png'
import { useDispatch } from 'react-redux'
import {
  setShowLoginModal,
  setShowRegisterModal,
} from '../redux/slices/appSlice'
const UserNav = () => {
  const dispatch = useDispatch()
  return (
    <div className='container max-w-6xl mx-auto px-4 bg-orange-300'>
      <div className='flex items-center justify-between space-x-20'>
        <div className='flex items-center z-30'>
          <div id='logo' className='w-18 h-12'>
            <img src={logo} alt='logo' />
          </div>
          <div className='leading-5'>
            Fun <br /> Olympic
          </div>
        </div>
        <div className='flex  items-center space-x-4'>
          <div className='flex text-white mr-8 gap-4'>menu</div>
          <div className='flex space-x-2'>
            <button
              className='bg-sky-500 btn'
              onClick={() => dispatch(setShowLoginModal(true))}
            >
              SignIn
            </button>
            <button
              className='bg-emerald-500 btn'
              onClick={() => dispatch(setShowRegisterModal(true))}
            >
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserNav
