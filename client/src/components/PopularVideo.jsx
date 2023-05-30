import { AiFillEye } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { FaPlay } from 'react-icons/fa'
import { videos } from '../dataVideos'
const PopularVideo = () => {
  return (
    <div>
      <h1 className='text-5xl py-6 font-bold'>Popular videos</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {videos.slice(0, 6).map((video, index) => {
          return (
            <div className=' rounded-lg bg-purple-300 group' key={index}>
              <div className='relative w-full flex h-44  md:h-48  lg:h-52   rounded-t-lg overflow-hidden '>
                <img
                  src={video.thumbnail}
                  className='transition-all ease-in-out duration-400 group-hover:scale-125'
                  alt='thumbnail'
                />
                <div className='absolute inset-0 flex justify-center items-center'>
                  <FaPlay size={44} className='text-gray-300 ' />
                </div>
              </div>
              <div id='about-video' className='p-3 space-y-2'>
                <p className='h-12 md:h-14 font-semibold md:text-xl overflow-hidden'>
                  {video.title} lkjadslfkjaldskfj lkasdjflkjas dlkfjal sdfjklaj
                  dfkjlaksd jfkljasd lkfjadslkf j
                </p>
                <div className='flex justify-between'>
                  <p>Date</p>
                  <div className='flex space-x-4'>
                    <p className='flex justify-center items-center space-x-1'>
                      <AiFillEye /> <span>223</span>
                    </p>
                    <p className='flex items-center space-x-1'>
                      <BiCommentDetail /> <span>23</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className='flex justify-center pt-6'>
        <button className='btn bg-sky-500 py-2 text-xl'>{`View more >>`}</button>
      </div>
    </div>
  )
}

export default PopularVideo
