import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import AdminNav from '../../components/AdminNav'
import BlockConfirmationModal from '../../components/BlockConfirmationModal'
import { useSelector } from 'react-redux'

const AdminLayout = () => {
  const store = useSelector((store) => store.app)
  const { showBlockConfirmationModal } = store
  return (
    <div className='w-full h-screen max-h-screen flex'>
      {showBlockConfirmationModal && <BlockConfirmationModal />}
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
