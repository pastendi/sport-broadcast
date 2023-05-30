import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import AdminNav from '../../components/AdminNav'

const AdminLayout = () => {
  return (
    <div className='w-full h-screen max-h-screen flex  '>
      <div className='w-96'>
        <Sidebar />
      </div>
      <div className='flex-grow w-full'>
        <AdminNav />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
