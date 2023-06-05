import ModalLayout from './ModalLayout'
import { useDispatch, useSelector } from 'react-redux'
import { setShowDeleteVideoModal } from '../redux/slices/appSlice'
import Errors from './Form/Errors'
import { deleteVideoAction } from '../redux/slices/videoSlice'

const DeleteVideoModal = () => {
  const dispatch = useDispatch()
  const appData = useSelector((store) => store.app)
  const { selected } = appData

  const videoData = useSelector((store) => store.videos)
  const { loading, appErr, serverErr, registered } = videoData

  const body = (
    <div className='flex flex-col space-y-6'>
      {appErr && <Errors errors={appErr} />}
      <p className='text-2xl text-center'>
        Are you sure you want to delete this video?
      </p>
      <div className='flex space-x-2 w-full justify-center'>
        <div className='w-56 h-36'>
          <img src={selected.thumbnail} alt='video thumbnail' />
        </div>
        <div className='w-56'>{selected.title}</div>
      </div>

      <div className='flex justify-center space-x-4'>
        <button
          className='btn bg-emerald-500'
          disabled={loading}
          onClick={() => dispatch(deleteVideoAction(selected._id))}
        >
          Yes
        </button>
        <button
          className='btn bg-red-500'
          disabled={loading}
          onClick={() => dispatch(setShowDeleteVideoModal({ show: false }))}
        >
          No
        </button>
      </div>
    </div>
  )

  return (
    <ModalLayout
      title='Delete video'
      body={body}
      close={() => dispatch(setShowDeleteVideoModal({ show: false }))}
    />
  )
}

export default DeleteVideoModal
