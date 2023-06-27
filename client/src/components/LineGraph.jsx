import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVideosAction } from '../redux/slices/videoSlice'
const LineGraph = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const chartOptions = {
    chart: {
      id: 'product-line-chart',
    },
    xaxis: {
      type: 'datetime',
      title: {
        text: 'Date',
      },
    },
    yaxis: {
      title: {
        text: 'Number of videos',
      },
    },
  }
  const { videoList } = useSelector((store) => store.videos)

  useEffect(() => {
    const dataByDay = {}
    videoList.forEach((video) => {
      const date = video.createdAt.split('T')[0]
      if (dataByDay[date]) {
        dataByDay[date] += 1
      } else {
        dataByDay[date] = 1
      }
    })
    const chartData = Object.entries(dataByDay).map(([date, count]) => ({
      x: new Date(date).getTime(),
      y: count,
    }))
    setData(chartData)
  }, [videoList])

  useEffect(() => {
    if (videoList?.length === 0) {
      dispatch(fetchVideosAction())
    }
  }, [dispatch])
  return (
    <div>
      {data.length > 0 ? (
        <Chart
          options={chartOptions}
          series={[
            {
              name: 'video Count',
              data: data,
            },
          ]}
          type='line'
        />
      ) : (
        <h1>loading....</h1>
      )}
    </div>
  )
}

export default LineGraph
