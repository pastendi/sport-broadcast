import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import AdminNav from '../../components/AdminNav'

const AdminLayout = () => {
  return (
    <div className='w-full h-screen max-h-screen flex  '>
      <div className='w-80'>
        <Sidebar />
      </div>
      <div className='w-full'>
        <AdminNav />
        <div className='p-6'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
