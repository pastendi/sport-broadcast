import { logo } from '../assets'
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
import { useState, useRef, useEffect } from 'react'
const UserNav = () => {
  const dropdownRef = useRef(null)
  const [showUserOption, setShowUserOption] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector((store) => store.users)
  const { userAuth } = userData

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowUserOption(false)
    }
  }

  const [menuClicked, setMenuClicked] = useState(false)

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <main>
      <div className='flex items-center justify-between space-x-10 py-2'>
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
                className='flex justify-center items-center space-x-1 px-3 py-1 rounded-md bg-orange-300 cursor-pointer'
                onClick={() => setShowUserOption(!showUserOption)}
              >
                <span>{`Hi ${userAuth.username}`}</span> <AiFillSetting />
              </div>
              {showUserOption && (
                <div
                  ref={dropdownRef}
                  className='hidden md:block z-20 absolute top-9 right-0 bg-orange-300 text-black w-32 p-2 space-y-2 rounded-md text-left'
                >
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
        <div className='flex md:hidden items-center space-x-3'>
          {userAuth && <p>{`Hi ${userAuth.username}`} </p>}
          <div
            type='button'
            className={`z-30 block  focus:outline-none  ${
              menuClicked ? 'text-red-600' : 'text-black'
            }`}
            onClick={() => setMenuClicked(!menuClicked)}
          >
            {menuClicked ? (
              <IoMdClose size={40} />
            ) : (
              <GiHamburgerMenu size={32} />
            )}
          </div>
        </div>
      </div>
      {/* mobile menu */}
      <div
        className={`fixed inset-0 z-20 ${
          menuClicked ? 'flex' : 'hidden'
        } md:hidden flex-col items-center self-end w-full h-full min-h-screen p-6 pt-28 divide-y divide-gray-300 opacity-90 bg-gray-700`}
      >
        {userNavLinks.map((link, index) => (
          <NavLink
            to={link.path}
            key={index}
            className={({ isActive }) =>
              isActive ? 'mobile-link bg-orange-500' : 'mobile-link'
            }
            onClick={() => setMenuClicked(false)}
          >
            {link.text}
          </NavLink>
        ))}
        {userAuth ? (
          <div className='w-full divide-y divide-gray-400 opacity-90 bg-gray-700'>
            <NavLink
              to='/favorites'
              className={({ isActive }) =>
                isActive ? 'mobile-link bg-orange-500' : 'mobile-link'
              }
              onClick={() => setMenuClicked(false)}
            >
              Favorites
            </NavLink>
            <NavLink
              to='/'
              className='mobile-link'
              onClick={() => {
                setMenuClicked(false)
                dispatch(logoutAction())
              }}
            >
              Logout
            </NavLink>
          </div>
        ) : (
          <div className='flex w-full justify-center space-x-2 pt-6'>
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
        )}
      </div>
    </main>
  )
}

export default UserNav
