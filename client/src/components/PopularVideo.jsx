import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVideosAction } from '../redux/slices/videoSlice'
import VideoList from './VideoList'

const PopularVideo = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [popular, setPopular] = useState([])

  const sortByViews = (data) => {
    return [...data].sort((a, b) => b.views - a.views)
  }
  const storeData = useSelector((state) => state?.videos)
  const { videoList, loading, appErr, serverErr } = storeData

  useEffect(() => {
    dispatch(fetchVideosAction())
  }, [dispatch])

  useEffect(() => {
    if (videoList) {
      const sortVideos = sortByViews(videoList)
      setPopular(sortVideos)
    }
  }, [videoList])

  if (!popular) return <h1>Loading...</h1>
  return (
    <div>
      <h1 className='text-5xl py-6 font-bold'>Popular videos</h1>
      <VideoList list={popular.slice(0, 6)} />
      <div className='flex justify-center pt-6'>
        <button
          className='btn bg-sky-500 py-2 text-xl'
          onClick={() => navigate('/videos')}
        >{`View more >>`}</button>
      </div>
    </div>
  )
}

export default PopularVideo
