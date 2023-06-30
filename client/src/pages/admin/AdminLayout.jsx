import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import AdminNav from '../../components/AdminNav'
import BlockConfirmationModal from '../../components/BlockConfirmationModal'
import { useSelector } from 'react-redux'
import EditCarouselModel from '../../components/EditCarouselModel'
import { ToastContainer } from 'react-toastify'

const AdminLayout = () => {
  const store = useSelector((store) => store.app)
  const { showBlockConfirmationModal, showEditCarouselModel } = store
  const userStore = useSelector((store) => store.users)
  const { userAuth } = userStore
  if (!userAuth || userAuth.email !== 'admin@gmail.com')
    return <Navigate to='/cpanel' />
  return (
    <>
      <ToastContainer position='bottom-right' autoClose={3000} />
      {showBlockConfirmationModal && <BlockConfirmationModal />}
      {showEditCarouselModel && <EditCarouselModel />}
      <div className='w-full h-screen max-h-screen flex'>
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
    </>
  )
}

export default AdminLayout
