import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVideosAction } from '../../redux/slices/videoSlice'
import VideoList from '../../components/VideoList'

const Favorites = () => {
  const dispatch = useDispatch()
  const { videoList } = useSelector((store) => store.videos)
  const { userAuth } = useSelector((store) => store.users)
  const favorites = videoList?.filter((x) => userAuth.favorites.includes(x._id))
  useEffect(() => {
    if (videoList?.length === 0) {
      dispatch(fetchVideosAction())
    }
  }, [dispatch])
  if (favorites.length === 0)
    return (
      <h1 className='text-4xl mt-20 text-center'>
        No video added to favorite list yet
      </h1>
    )
  return (
    <main>
      <h1 className='text-5xl font-semibold my-4'>Favorites videos</h1>
      <VideoList list={favorites} />
    </main>
  )
}

export default Favorites
