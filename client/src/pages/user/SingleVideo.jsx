import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { findVideoAction } from '../../redux/slices/videoSlice'
import VideoSection from '../../components/VideoSection'
import RecommendationVideoModel from '../../components/RecommendationVideoModel'

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
        <div className='basis-2/6'>
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
      </div>
    </main>
  )
}

export default SingleVideo
