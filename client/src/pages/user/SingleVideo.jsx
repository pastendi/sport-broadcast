import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { findVideoAction } from '../../redux/slices/videoSlice'
import { formatDistanceToNowStrict } from 'date-fns'
import ReactPlayer from 'react-player'
import {
  BsHandThumbsUp,
  BsHandThumbsDown,
  BsHandThumbsUpFill,
  BsHandThumbsDownFill,
} from 'react-icons/bs'
import { MdBookmarkAdd, MdBookmarkAdded } from 'react-icons/md'
const SingleVideo = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { currentVideo } = useSelector((store) => store.videos)
  const { userAuth } = useSelector((store) => store.users)
  const age = useMemo(() => {
    if (!currentVideo.createdAt) {
      return null
    }
    return formatDistanceToNowStrict(new Date(currentVideo?.createdAt))
  }, [currentVideo?.createdAt])
  useEffect(() => {
    dispatch(findVideoAction(id))
  }, [dispatch, id])
  if (!currentVideo) return <h1>Loading...</h1>
  return (
    <main>
      <div className='flex flex-col lg:flex-row gap-6'>
        {/* left video side */}
        <div id='video' className='basis-3/4 space-y-4'>
          <div className='aspect-video bg-sky-400'>
            <ReactPlayer
              controls
              url={currentVideo?.url}
              width='100%'
              height='100%'
              playing={true}
            ></ReactPlayer>
          </div>
          <div className='font-semibold'>{currentVideo.title}</div>
          <div className='flex w-full flex-row-reverse gap-4'>
            <div className=' rounded-xl bg-slate-300 bg-opacity-70 py-1 px-4'>
              {userAuth?.favorites?.includes(currentVideo?._id) ? (
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
                {currentVideo?.likes?.includes(userAuth?.id) ? (
                  <button className='text-blue-500'>
                    <BsHandThumbsUpFill />
                  </button>
                ) : (
                  <button>
                    <BsHandThumbsUp />
                  </button>
                )}

                <span>{currentVideo?.likes?.length || 0}</span>
              </div>
              <div>
                {currentVideo?.disLikes?.includes(userAuth?.id) ? (
                  <button className='text-blue-500'>
                    <BsHandThumbsDownFill />
                  </button>
                ) : (
                  <button>
                    <BsHandThumbsDown />
                  </button>
                )}
                <span>{currentVideo?.disLikes?.length || 0}</span>
              </div>
            </div>
          </div>
          <div className=' w-full rounded-xl p-4 bg-slate-300 bg-opacity-70'>
            <div className='flex space-x-4 font-semibold'>
              <p>223 Views</p>
              <p>{age}</p>
            </div>
            <p>{currentVideo?.description}</p>
          </div>
        </div>
        {/* chat and recommendation side */}
        <div className='basis-1/4'>
          <div className='gap-2'>
            <h1 className='text-xl sm:text-2xl font-semibold'>
              Recommendataions
            </h1>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SingleVideo
