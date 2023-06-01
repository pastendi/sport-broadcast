import React from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentPage } from '../../redux/slices/appSlice'

const Dashboard = () => {
  const dispatch = useDispatch()
  dispatch(setCurrentPage('Dashboard'))
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard
