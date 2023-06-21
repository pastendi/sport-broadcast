import { formatDistanceToNowStrict } from 'date-fns'
import { useMemo } from 'react'
import { useNavigate } from 'react-router'
const RecommendationVideoModel = ({
  _id,
  thumbnail,
  title,
  views,
  createdAt,
}) => {
  const navigate = useNavigate()
  const age = useMemo(() => {
    if (!createdAt) {
      return null
    }
    return formatDistanceToNowStrict(new Date(createdAt))
  }, [createdAt])
  return (
    <div
      className='flex gap-2 cursor-pointer'
      onClick={() => navigate(`/video/${_id}`)}
    >
      <div className='aspect-video flex-1 rounded-lg overflow-hidden'>
        <img src={thumbnail} alt='thumbnail' />
      </div>
      <div className='flex-1'>
        <h1 className='font-semibold'>{title.substring(0, 50)}...</h1>
        <div className='flex gap-4 text-sm'>
          <h3>{views} views</h3>
          <h3>{age}</h3>
        </div>
      </div>
    </div>
  )
}

export default RecommendationVideoModel
