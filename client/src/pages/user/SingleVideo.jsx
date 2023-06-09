import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { findVideoAction } from '../../redux/slices/videoSlice'
import VideoSection from '../../components/VideoSection'
import RecommendationVideoModel from '../../components/RecommendationVideoModel'
import CommentSection from '../../components/CommentSection'
import LiveChat from '../../components/LiveChat'

const SingleVideo = () => {
  const dispatch = useDispatch()

  const { id } = useParams()
  const { currentVideo, recommendation } = useSelector((store) => store.videos)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    dispatch(findVideoAction(id))
  }, [dispatch, id])
  if (!currentVideo) return <h1>Loading...</h1>
  return (
    <main>
      <div className='flex flex-col lg:flex-row gap-6'>
        {/* left video side */}
        <VideoSection video={currentVideo} />
        {/* chat and recommendation side */}
        <div className='lg:basis-2/6 flex flex-col gap-6'>
          {/* live chat */}

          {currentVideo?.live && <LiveChat id={id} />}
          <div className='gap-2'>
            <h1 className='text-xl sm:text-2xl font-semibold'>
              Recommendataions
            </h1>
            <div className='flex flex-col space-y-4'>
              {recommendation.map((video) => (
                <RecommendationVideoModel key={video._id} {...video} />
              ))}
            </div>
          </div>
        </div>
        {/* comments in small screen */}
        {!currentVideo.live && (
          <div className='flex w-full lg:hidden'>
            <CommentSection id={id} />
          </div>
        )}
      </div>
    </main>
  )
}

export default SingleVideo
