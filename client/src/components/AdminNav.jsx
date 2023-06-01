import React from 'react'
import { useSelector } from 'react-redux'
import { CgMenuRound } from 'react-icons/cg'
const AdminNav = () => {
  const storeData = useSelector((store) => store.app)
  const { currentPage } = storeData
  return (
    <div className='w-full bg-slate-600 flex justify-between items-center p-6'>
      <h1 className='text-white text-3xl flex items-center space-x-2'>
        <CgMenuRound />
        <span>{currentPage}</span>
      </h1>
      <p className='text-white text-xl'>Hi admin</p>
    </div>
  )
}

export default AdminNav
