import { useMemo } from 'react'
import { useNavigate } from 'react-router'
import { formatDistanceToNowStrict } from 'date-fns'
import { AiFillEye } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { FaPlay } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { setShowLoginModal } from '../redux/slices/appSlice'
const VideoModal = ({
  _id,
  title,
  thumbnail,
  live,
  views,
  comments,
  createdAt,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const date = useMemo(() => {
    if (!createdAt) {
      return null
    }
    return formatDistanceToNowStrict(new Date(createdAt))
  }, [createdAt])

  const { userAuth } = useSelector((store) => store.users)

  const watchVideo = () => {
    if (userAuth) {
      navigate(`/video/${_id}`)
    } else {
      dispatch(setShowLoginModal(true))
    }
  }
  return (
    <div className=' rounded-lg bg-purple-300 group' onClick={watchVideo}>
      <div className='relative w-full flex h-44  md:h-48  lg:h-52   rounded-t-lg overflow-hidden '>
        <img
          src={thumbnail}
          className='transition-all ease-in-out duration-400 group-hover:scale-125 relative'
          alt='thumbnail'
        />
        {live && (
          <div className='btn absolute right-2 bottom-2 px-4 py-1 bg-red-600 text-lg font-semibold'>
            Live
          </div>
        )}
        <div className='absolute inset-0 flex justify-center items-center'>
          <FaPlay size={44} className='text-gray-300 ' />
        </div>
      </div>
      <div id='about-video' className='p-3 space-y-2'>
        <p className='h-12 md:h-14 font-semibold md:text-xl overflow-hidden'>
          {title}
        </p>
        <div className='flex justify-between'>
          <p>{date}</p>
          <div className='flex space-x-4'>
            <p className='flex justify-center items-center space-x-1'>
              <AiFillEye /> <span>{views}</span>
            </p>
            <p className='flex items-center space-x-1'>
              <BiCommentDetail /> <span>{comments.length}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoModal
