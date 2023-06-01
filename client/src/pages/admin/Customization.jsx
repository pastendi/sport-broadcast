import React from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentPage } from '../../redux/slices/appSlice'
const Customization = () => {
  const dispatch = useDispatch()
  dispatch(setCurrentPage('Customization'))
  return <div>Customization</div>
}

export default Customization
