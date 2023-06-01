import React from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentPage } from '../../redux/slices/appSlice'
const ManageVideos = () => {
  const dispatch = useDispatch()
  dispatch(setCurrentPage('Videos'))
  return <div>ManageVideos</div>
}

export default ManageVideos
