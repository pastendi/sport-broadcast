import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../../redux/slices/appSlice'
import LineGraph from '../../components/LineGraph'
import PieChart from '../../components/PieChart'
import { fetchVideosAction } from '../../redux/slices/videoSlice'
import { fetchUsers } from '../../redux/slices/userSlice'

const data = {
  totalVideos: 0,
  liveVideos: 0,
  totalUsers: 0,
  blockedUser: 0,
}
const Dashboard = () => {
  const [stat, setStat] = useState(data)
  const dispatch = useDispatch()
  const { videoList } = useSelector((store) => store.videos)
  const { users } = useSelector((store) => store.users)
  useEffect(() => {
    const totalVideos = videoList?.length
    const totalUsers = users?.length
    const liveVideos = videoList.filter((x) => x.live === true).length
    const blockedUser = users.filter((x) => x.isBlocked === true).length
    setStat({ totalUsers, totalVideos, liveVideos, blockedUser })
  }, [videoList])
  useEffect(() => {
    dispatch(setCurrentPage('Dashboard'))
    if (videoList?.length === 0) {
      dispatch(fetchVideosAction())
    }
    if (users?.length === 0) {
      dispatch(fetchUsers())
    }
  }, [dispatch])
  return (
    <>
      <div>
        {/* stats */}
        <div className='flex justify-between gap-4'>
          <div className='flex flex-col items-center justify-center bg-slate-500 w-56 py-4 font-bold text-2xl text-white'>
            <p> Total Videos</p>
            <p>{stat.totalVideos}</p>
          </div>
          <div className='flex flex-col items-center justify-center bg-sky-500 w-56 py-4  font-bold text-2xl text-white'>
            <p>Live Videos</p>
            <p>{stat.liveVideos}</p>
          </div>
          <div className='flex flex-col items-center justify-center bg-emerald-500 w-56 py-4  font-bold text-2xl text-white'>
            <p>Total Users</p>
            <p>{stat.totalUsers}</p>
          </div>
          <div className='flex flex-col items-center justify-center bg-orange-600 w-56 py-4  font-bold text-2xl text-white'>
            <p className=''>Blocked Users</p>
            <p>{stat.blockedUser}</p>
          </div>
        </div>
      </div>
      <div className='flex my-20 gap-40'>
        <div className='flex-1'>
          <LineGraph />
        </div>
        <div className='flex-1'>
          <PieChart />
        </div>
      </div>
    </>
  )
}

export default Dashboard
