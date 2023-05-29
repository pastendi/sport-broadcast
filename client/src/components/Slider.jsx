import { useEffect, useState } from 'react'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'
import { sliderItems } from '../data'
const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleSlide = (direction) => {
    if (direction === 'left') {
      setCurrentSlide((prevSlide) =>
        prevSlide === 0 ? sliderItems.length - 1 : prevSlide - 1
      )
    } else {
      setCurrentSlide((prevSlide) =>
        prevSlide === sliderItems.length - 1 ? 0 : prevSlide + 1
      )
    }
  }
  const moveDot = (index) => {
    setCurrentSlide(index)
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSlide()
    }, 4000)

    return () => {
      clearTimeout(timer)
    }
  }, [currentSlide])

  return (
    <div className='relative flex  justify-center items-center w-full h-64  sm:h-80 md:h-96 lg:h-[35rem] overflow-hidden'>
      <div className='flex h-full  overflow-hidden'>
        {sliderItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 flex items-center  transform transition-transform ${
              index === currentSlide ? 'translate-x-0' : '-translate-x-full'
            }  transition-all duration-1000 `}
          >
            <img src={item.img} alt='' />
          </div>
        ))}
      </div>
      <button
        className='p-2 absolute z-10 right-0 mr-2 bg-slate-200 rounded-full opacity-40'
        onClick={() => handleSlide('right')}
      >
        <BiRightArrow size={24} />
      </button>
      <button
        className='p-2  absolute z-10 left-0 ml-2 bg-slate-200 rounded-full opacity-40'
        onClick={() => handleSlide('left')}
      >
        <BiLeftArrow size={24} />
      </button>
      <div className='absolute left-[50%] -translate-x-[50%]  bottom-3 z-10 flex md:space-x-4 space-x-3'>
        {sliderItems.map((item, index) => (
          <div
            key={index}
            onClick={() => moveDot(index)}
            className={
              currentSlide === index ? 'slider-dot bg-black' : 'slider-dot'
            }
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Slider
