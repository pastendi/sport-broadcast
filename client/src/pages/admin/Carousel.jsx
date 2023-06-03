import React, { useEffect } from 'react'
import { FaEdit } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCurrentPage,
  setShowEditCarouselModel,
} from '../../redux/slices/appSlice'
import { fetchCarousels } from '../../redux/slices/carouselSlice'
const Carousel = () => {
  const dispatch = useDispatch()
  const store = useSelector((store) => store.carousels)
  const { carousels } = store
  useEffect(() => {
    dispatch(setCurrentPage('Carousel'))
    dispatch(fetchCarousels())
  }, [dispatch])
  return (
    <div className='grid grid-cols-3 gap-6 mt-4'>
      {carousels?.map((item, index) => {
        return (
          <div
            key={index}
            className='w-full h-64 relative rounded-lg overflow-hidden'
          >
            <img src={item.src} alt='' />
            <button
              className='absolute top-2 right-2 text-yellow-400 cursor-pointer hover:bg-orange-500 hover:text-white p-2 rounded-xl hover:bg-opacity-80'
              onClick={() =>
                dispatch(setShowEditCarouselModel({ image: item, show: true }))
              }
            >
              <FaEdit size={30} />
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Carousel
