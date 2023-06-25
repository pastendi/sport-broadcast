import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVideosAction, showPopular } from '../redux/slices/videoSlice'
import VideoList from './VideoList'

const PopularVideo = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { videoList, filteredList, loading, appErr, serverErr } = useSelector(
    (state) => state?.videos
  )

  useEffect(() => {
    dispatch(fetchVideosAction())
  }, [dispatch])

  useEffect(() => {
    if (videoList) {
      dispatch(showPopular())
    }
  }, [dispatch, videoList])

  if (loading) return <h1>Loading...</h1>
  return (
    <div>
      <h1 className='text-5xl py-6 font-bold'>Popular videos</h1>
      <VideoList list={filteredList.slice(0, 6)} />
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
