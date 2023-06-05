import React from 'react'
import { useNavigate } from 'react-router'
import { logo } from '../assets'
import { adminNavLinks } from '../constants'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutAction } from '../redux/slices/userSlice'
const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <div className='w-full h-screen bg-slate-600 space-y-4 relative'>
      <div className='p-6'>
        <div
          className='flex items-center justify-center z-30 cursor-pointer p-4 bg-slate-400 rounded-xl'
          onClick={() => navigate('/admin/')}
        >
          <div id='logo' className='w-24 h-16'>
            <img src={logo} alt='logo' />
          </div>
          <div className='leading-8 text-2xl font-bold text-white'>
            Fun <br /> Olympic
          </div>
        </div>
      </div>
      <div className='flex flex-col '>
        {adminNavLinks.map((link, index) => {
          const { path, text } = link
          return (
            <NavLink
              key={index}
              to={path}
              className={({ isActive }) =>
                isActive ? 'admin-link text-black bg-sky-100' : 'admin-link'
              }
            >
              <link.icon /> <span>{text}</span>
            </NavLink>
          )
        })}
      </div>
      <button
        className='text-white  absolute bottom-7 right-5 font-bold px-3 py-1 rounded-lg hover:text-black text-xl hover:bg-slate-300'
        onClick={() => {
          dispatch(logoutAction())
          navigate('/cpanel')
        }}
      >
        Logout
      </button>
    </div>
  )
}

export default Sidebar
