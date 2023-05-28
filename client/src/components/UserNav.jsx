import logo from '../assets/logo.png'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { userNavLinks } from '../constants'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdClose } from 'react-icons/io'
import {
  setShowLoginModal,
  setShowRegisterModal,
} from '../redux/slices/appSlice'
import { useState } from 'react'
const UserNav = () => {
  const dispatch = useDispatch()
  const [menuClicked, setMenuClicked] = useState(false)
  return (
    <div className='container max-w-6xl mx-auto p-4 bg-orange-300'>
      <div className='flex items-center justify-between space-x-10'>
        <div className='flex items-center z-30'>
          <div id='logo' className='w-18 h-16'>
            <img src={logo} alt='logo' />
          </div>
          <div className='leading-5'>
            Fun <br /> Olympic
          </div>
        </div>
        <div className='hidden md:flex space-x-4  '>
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
        {/* menu button */}
        <button
          type='button'
          className={`z-30 block md:hidden focus:outline-none  ${
            menuClicked ? 'text-red-600' : 'text-white'
          }`}
          onClick={() => setMenuClicked(!menuClicked)}
        >
          {menuClicked ? (
            <IoMdClose size={46} />
          ) : (
            <GiHamburgerMenu size={40} />
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
      </div>
    </div>
  )
}

export default UserNav
