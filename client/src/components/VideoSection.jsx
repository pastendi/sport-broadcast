import { useSelector } from 'react-redux'
import ReactPlayer from 'react-player'
import {
  BsHandThumbsUp,
  BsHandThumbsDown,
  BsHandThumbsUpFill,
  BsHandThumbsDownFill,
} from 'react-icons/bs'
import { formatDistanceToNowStrict } from 'date-fns'
import { useMemo } from 'react'
import { MdBookmarkAdd, MdBookmarkAdded } from 'react-icons/md'
import CommentSection from './CommentSection'

const VideoSection = ({ video }) => {
  const { userAuth } = useSelector((store) => store.users)
  const age = useMemo(() => {
    if (!video.createdAt) {
      return null
    }
    return formatDistanceToNowStrict(new Date(video.createdAt))
  }, [video.createdAt])
  return (
    <div id='video' className='basis-3/4 space-y-4'>
      <div className='aspect-video bg-sky-400'>
        <ReactPlayer
          controls
          url={video.url}
          width='100%'
          height='100%'
          playing={true}
        ></ReactPlayer>
      </div>
      <div className='font-semibold'>{video.title}</div>
      <div className='flex w-full flex-row-reverse gap-4'>
        <div className=' rounded-xl bg-slate-300 bg-opacity-70 py-1 px-4'>
          {userAuth?.favorites?.includes(video._id) ? (
            <div className='flex items-center'>
              <button className='text-blue-600'>
                <MdBookmarkAdded />
              </button>
              <span className='font-sembold text-blue-600'>Saved</span>
            </div>
          ) : (
            <div className='flex items-center'>
              <button className='text-green-600'>
                <MdBookmarkAdd />
              </button>
              <span className='font-sembold text-green-600'>Save</span>
            </div>
          )}
        </div>
        <div className='flex space-x-4 rounded-xl py-1 px-4 bg-slate-300 bg-opacity-70'>
          <div>
            {video.likes?.includes(userAuth?.id) ? (
              <button className='text-blue-500'>
                <BsHandThumbsUpFill />
              </button>
            ) : (
              <button>
                <BsHandThumbsUp />
              </button>
            )}

            <span>{video.likes?.length || 0}</span>
          </div>
          <div>
            {video.disLikes?.includes(userAuth?.id) ? (
              <button className='text-blue-500'>
                <BsHandThumbsDownFill />
              </button>
            ) : (
              <button>
                <BsHandThumbsDown />
              </button>
            )}
            <span>{video.disLikes?.length || 0}</span>
          </div>
        </div>
      </div>
      <div className=' w-full rounded-xl p-4 bg-slate-300 bg-opacity-70'>
        <div className='flex space-x-4 font-semibold'>
          <p>223 Views</p>
          <p>{age}</p>
        </div>
        <p>{video.description}</p>
      </div>
      <CommentSection id={video._id} />
    </div>
  )
}

export default VideoSection
