import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVideosAction } from '../redux/slices/videoSlice'

const PieChart = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState({})
  const { videoList } = useSelector((store) => store.videos)

  useEffect(() => {
    const reducedVideos = videoList.reduce((result, video) => {
      const { name } = video.sport

      if (!result[name]) {
        result[name] = 0
      }
      result[name]++

      return result
    }, {})

    const formattedChartData = Object.keys(reducedVideos).map((name) => ({
      name,
      count: reducedVideos[name],
    }))

    setData({
      series: formattedChartData.map((data) => data.count),
      options: {
        labels: formattedChartData.map((data) => data.name),
      },
    })
  }, [videoList])
  useEffect(() => {
    if (videoList?.length === 0) {
      dispatch(fetchVideosAction())
    }
  }, [dispatch])
  return (
    <div>
      {data.series ? (
        <Chart options={data.options} series={data.series} type='pie' />
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  )
}

export default PieChart
