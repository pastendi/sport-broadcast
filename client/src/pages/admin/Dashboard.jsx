import React from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentPage } from '../../redux/slices/appSlice'

const Dashboard = () => {
  const dispatch = useDispatch()
  dispatch(setCurrentPage('Dashboard'))
  return (
    <div>
      {/* stats */}
      <div className='flex justify-between gap-4'>
        <div className='flex flex-col items-center justify-center bg-slate-500 w-56 py-4 font-bold text-2xl text-white'>
          <p> Total Videos</p>
          <p>200</p>
        </div>
        <div className='flex flex-col items-center justify-center bg-sky-500 w-56 py-4  font-bold text-2xl text-white'>
          <p>Live Videos</p>
          <p>200</p>
        </div>
        <div className='flex flex-col items-center justify-center bg-emerald-500 w-56 py-4  font-bold text-2xl text-white'>
          <p>Total Users</p>
          <p>200</p>
        </div>
        <div className='flex flex-col items-center justify-center bg-orange-600 w-56 py-4  font-bold text-2xl text-white'>
          <p className=''>Blocked Users</p>
          <p>200</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
