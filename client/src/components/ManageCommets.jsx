import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment, getAllComments } from '../redux/slices/commentSlice'
import Errors from './Form/Errors'
import Comment from './Comment'
import { ImBin } from 'react-icons/im'
import ModalLayout from './ModalLayout'
import { setShowManageCommentsModal } from '../redux/slices/appSlice'

const ManageComments = () => {
  const dispatch = useDispatch()
  const { selected } = useSelector((store) => store.app)
  const { comments, appErr } = useSelector((store) => store.comments)
  useEffect(() => {
    dispatch(getAllComments(selected._id))
  }, [dispatch, selected])

  const body = (
    <div className='flex flex-col space-y-4 max-h-[70vh] overflow-y-scroll'>
      {comments.map((item) => (
        <div
          key={item._id}
          className='flex justify-between w-full rounded-lg bg-gray-400 p-2 bg-opacity-50'
        >
          <Comment {...item} />
          <div
            className='flex text-red-500 cursor-pointer w-10 h-full justify-center items-center'
            onClick={() => dispatch(deleteComment(item._id))}
          >
            <ImBin size={32} />
          </div>
        </div>
      ))}
    </div>
  )
  return (
    <ModalLayout
      title='Manage comments'
      body={body}
      close={() => dispatch(setShowManageCommentsModal(false))}
    />
  )
}

export default ManageComments
