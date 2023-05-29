import logo from '../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { userNavLinks } from '../constants'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdClose } from 'react-icons/io'
import { AiFillSetting } from 'react-icons/ai'
import { logoutAction } from '../redux/slices/userSlice.js'
import {
  setShowLoginModal,
  setShowRegisterModal,
} from '../redux/slices/appSlice'
import { useState } from 'react'
const UserNav = () => {
  const [showUserOption, setShowUserOption] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector((store) => store.users)
  const { userAuth } = userData
  const [menuClicked, setMenuClicked] = useState(false)
  return (
    <main>
      <div className='flex items-center justify-between space-x-10'>
        <div
          className='flex items-center z-30 cursor-pointer'
          onClick={() => navigate('/')}
        >
          <div id='logo' className='w-18 h-16'>
            <img src={logo} alt='logo' />
          </div>
          <div className='leading-5'>
            Fun <br /> Olympic
          </div>
        </div>
        <div className='hidden md:flex space-x-4 items-center'>
          {/* desktop nav */}
          <div className='flex mr-6 gap-4 '>
            {userNavLinks.map((link, index) => (
              <NavLink
                to={link.path}
                key={index}
                className={({ isActive }) =>
                  isActive ? 'nav-link border-b-4' : 'nav-link'
                }
              >
                {link.text}
              </NavLink>
            ))}
          </div>
          {userAuth ? (
            <div className='relative'>
              <div
                className='flex justify-center items-center space-x-1 px-3 py-1 rounded-md bg-orange-300 '
                onClick={() => setShowUserOption(!showUserOption)}
              >
                <span>{`Hi ${userData.userAuth.username}`}</span>{' '}
                <AiFillSetting />
              </div>
              {showUserOption && (
                <div className='hidden md:block z-20 absolute top-9 right-0 bg-orange-300 text-black w-32 p-2 space-y-2 rounded-md text-left'>
                  <p
                    className='cursor-pointer px-2 py-1 rounded-md hover:bg-orange-200'
                    onClick={() => {
                      setShowUserOption(false)
                      navigate('/favorites')
                    }}
                  >
                    Favorites
                  </p>
                  <p
                    className='cursor-pointer px-2 py-1 rounded-md hover:bg-orange-200'
                    onClick={() => {
                      setShowUserOption(false)
                      dispatch(logoutAction())
                      navigate('/')
                    }}
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className='flex space-x-2'>
              <button
                className='bg-sky-600 btn hover:bg-sky-500'
                onClick={() => dispatch(setShowLoginModal(true))}
              >
                SignIn
              </button>
              <button
                className='bg-emerald-600 btn hover:bg-emerald-500'
                onClick={() => dispatch(setShowRegisterModal(true))}
              >
                SignUp
              </button>
            </div>
          )}
        </div>
        {/* menu button */}
        <button
          type='button'
          className={`z-30 block md:hidden focus:outline-none  ${
            menuClicked ? 'text-red-600' : 'text-black'
          }`}
          onClick={() => setMenuClicked(!menuClicked)}
        >
          {menuClicked ? (
            <IoMdClose size={40} />
          ) : (
            <GiHamburgerMenu size={32} />
          )}
        </button>
      </div>
      <div
        className={`fixed inset-0 z-20 ${
          menuClicked ? 'flex' : 'hidden'
        } md:hidden flex-col items-center self-end w-full h-full min-h-screen p-6 pt-28 divide-y divide-gray-400 opacity-90 bg-gray-700`}
      >
        {userNavLinks.map((link, index) => (
          <NavLink
            to={link.path}
            key={index}
            className='mobile-link'
            onClick={() => setMenuClicked(false)}
          >
            {link.text}
          </NavLink>
        ))}
        <div className='flex w-full justify-center space-x-2 py-4'>
          <button
            className='bg-sky-500 btn'
            onClick={() => {
              setMenuClicked(false)
              dispatch(setShowLoginModal(true))
            }}
          >
            SignIn
          </button>
          <button
            className='bg-emerald-500 btn'
            onClick={() => {
              setMenuClicked(false)
              dispatch(setShowRegisterModal(true))
            }}
          >
            SignUp
          </button>
        </div>
      </div>
    </main>
  )
}

export default UserNav
