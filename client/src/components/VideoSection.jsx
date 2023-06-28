import ReactPlayer from 'react-player'
import { formatDistanceToNowStrict } from 'date-fns'
import { useMemo } from 'react'

import CommentSection from './CommentSection'
import LikeFavorite from './LikeFavorite'

const VideoSection = ({ video }) => {
  const age = useMemo(() => {
    if (!video.createdAt) {
      return null
    }
    return formatDistanceToNowStrict(new Date(video.createdAt))
  }, [video.createdAt])
  return (
    <div id='video' className='lg:basis-3/4 space-y-4'>
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
      <LikeFavorite video={video} />
      <div className=' w-full rounded-xl p-4 bg-slate-300 bg-opacity-70'>
        <div className='flex space-x-4 font-semibold'>
          <p>{video.views} views</p>
          <p>{age}</p>
        </div>
        <p>{video.description}</p>
      </div>
      {!video.live && (
        <div className='hidden lg:flex'>
          <CommentSection id={video._id} />
        </div>
      )}
    </div>
  )
}

export default VideoSection
