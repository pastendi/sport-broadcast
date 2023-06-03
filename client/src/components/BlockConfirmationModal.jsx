import { useState } from 'react'
import Input from './Form/Input'
import Button from './Form/Button'
import ModalLayout from './ModalLayout'
import { useDispatch, useSelector } from 'react-redux'
import { setShowBlockConfirmationModal } from '../redux/slices/appSlice'
import { blockUnblock } from '../redux/slices/userSlice'

const BlockConfirmationModal = () => {
  const dispatch = useDispatch()
  const store = useSelector((store) => store.app)
  const { selected } = store
  const body = (
    <div className='flex flex-col space-y-4'>
      <div>
        <p>{`Are you sure you want to ${
          selected?.isBlocked ? 'Unblock ' : 'BLock '
        } this user with`}</p>
        <p>Email:{selected?.email}</p>
      </div>
      <div className='flex justify-center space-x-4'>
        <button
          className='btn bg-emerald-500'
          onClick={() => dispatch(blockUnblock(selected?._id))}
        >
          {selected?.isBlocked ? 'Unblock' : 'Block'}
        </button>
        <button className='btn bg-red-500'>Cancel</button>
      </div>
    </div>
  )
  if (!selected) return null
  return (
    <ModalLayout
      title={`${selected.isBlocked ? 'Unblock ' : 'BLock '} Confirmation`}
      body={body}
      close={() => dispatch(setShowBlockConfirmationModal({ show: false }))}
    />
  )
}

export default BlockConfirmationModal
