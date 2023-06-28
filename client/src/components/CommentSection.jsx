import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, getAllComments } from '../redux/slices/commentSlice'
import Errors from './Form/Errors'
import Comment from './Comment'

const CommentSection = ({ id }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const postComment = async (e) => {
    e.preventDefault()
    const payload = { comment, videoId: id }
    dispatch(addComment(payload))
    setComment('')
  }

  const { comments, appErr } = useSelector((store) => store.comments)
  useEffect(() => {
    if (id) {
      dispatch(getAllComments(id))
    }
  }, [dispatch, id])
  return (
    <div className='flex w-full flex-col gap-4'>
      <p>{comments?.length || 0} Comments</p>
      {appErr && <Errors errors={appErr} />}
      <form className='flex w-full'>
        <input
          type='text'
          value={comment}
          placeholder='Comment....'
          onChange={(e) => setComment(e.target.value)}
          className='flex-1 px-3 py-1 w-full bg-none outline-none'
        />
        <button
          className='px-3 py-1 bg-slate-300 bg-opacity-70 hover:bg-opacity-100'
          type='submit'
          onClick={postComment}
        >
          Comment
        </button>
      </form>
      <div className='flex flex-col space-y-8'>
        {comments.map((item) => (
          <Comment key={item._id} {...item} />
        ))}
      </div>
    </div>
  )
}

export default CommentSection
