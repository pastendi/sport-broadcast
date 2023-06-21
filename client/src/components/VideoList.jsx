import VideoModal from './VideoModal'

const VideoList = ({ list }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
      {list.map((video, index) => {
        return <VideoModal key={index} {...video} />
      })}
    </div>
  )
}

export default VideoList
