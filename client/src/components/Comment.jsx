import React, { useMemo } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
const Comment = ({ comment, user, createdAt }) => {
  const age = useMemo(() => {
    if (!createdAt) {
      return null
    }
    return formatDistanceToNowStrict(new Date(createdAt))
  }, [createdAt])
  return (
    <div className='flex flex-col'>
      <div className='flex space-x-4'>
        <p className='text-lg font-semibold flex items-center'>
          @{user.firstName}
        </p>
        <p className='text-sm flex items-center'>{age}</p>
      </div>
      <p>{comment}</p>
    </div>
  )
}

export default Comment
