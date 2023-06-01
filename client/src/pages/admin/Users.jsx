import React from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentPage } from '../../redux/slices/appSlice'
const Users = () => {
  const dispatch = useDispatch()
  dispatch(setCurrentPage('Users'))
  return <div>Users</div>
}

export default Users
