import {
  BsHandThumbsUp,
  BsHandThumbsDown,
  BsHandThumbsUpFill,
  BsHandThumbsDownFill,
} from 'react-icons/bs'
import { MdBookmarkAdd, MdBookmarkAdded } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { dislikeVideoAction, likeVideoAction } from '../redux/slices/videoSlice'
import { handleFavorite } from '../redux/slices/userSlice'
const LikeFavorite = ({ video }) => {
  const dispatch = useDispatch()
  const { userAuth } = useSelector((store) => store.users)
  return (
    <div className='flex w-full flex-row-reverse gap-4'>
      <div className=' rounded-xl bg-slate-300 bg-opacity-70 py-1 px-4'>
        {userAuth?.favorites?.includes(video._id) ? (
          <div className='flex items-center'>
            <button
              className='text-blue-600'
              onClick={() => dispatch(handleFavorite(video?._id))}
            >
              <MdBookmarkAdded />
            </button>
            <span className='font-sembold text-blue-600'>Saved</span>
          </div>
        ) : (
          <div className='flex items-center'>
            <button
              className='text-green-600'
              onClick={() => dispatch(handleFavorite(video?._id))}
            >
              <MdBookmarkAdd />
            </button>
            <span className='font-sembold text-green-600'>Save</span>
          </div>
        )}
      </div>
      <div className='flex space-x-4 rounded-xl py-1 px-4 bg-slate-300 bg-opacity-70'>
        <div>
          {video.likes?.includes(userAuth?.id) ? (
            <button
              className='text-blue-500'
              onClick={() => dispatch(likeVideoAction(video?._id))}
            >
              <BsHandThumbsUpFill />
            </button>
          ) : (
            <button onClick={() => dispatch(likeVideoAction(video?._id))}>
              <BsHandThumbsUp />
            </button>
          )}

          <span>{` ${video.likes?.length || 0}`}</span>
        </div>
        <div>
          {video.disLikes?.includes(userAuth?.id) ? (
            <button
              className='text-blue-500'
              onClick={() => dispatch(dislikeVideoAction(video?._id))}
            >
              <BsHandThumbsDownFill />
            </button>
          ) : (
            <button onClick={() => dispatch(dislikeVideoAction(video?._id))}>
              <BsHandThumbsDown />
            </button>
          )}
          <span>{` ${video.disLikes?.length || 0}`}</span>
        </div>
      </div>
    </div>
  )
}

export default LikeFavorite
