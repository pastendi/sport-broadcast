import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { setCurrentPage } from '../../redux/slices/appSlice'
import { sliderItems } from '../../data'
const Carousel = () => {
  const dispatch = useDispatch()
  dispatch(setCurrentPage('Carousel'))
  return (
    <div>
      <div className='grid grid-cols-3 gap-6 mt-4'>
        {sliderItems.map((item, index) => {
          return (
            <div
              key={index}
              className='w-full h-64 relative rounded-lg overflow-hidden'
            >
              <img src={item.img} alt='' />
              <button className='absolute top-2 right-2 text-yellow-400 cursor-pointer hover:bg-black hover:text-white p-2 rounded-md'>
                <FaEdit size={30} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Carousel
