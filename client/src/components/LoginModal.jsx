import { useState } from 'react'
import Input from './Form/Input'
import Button from './Form/Button'
import ModalLayout from './ModalLayout'
import { useDispatch, useSelector } from 'react-redux'
import {
  setShowLoginModal,
  toggleLoginRegister,
} from '../redux/slices/appSlice'
import { loginUserAction } from '../redux/slices/userSlice'
import Errors from './Form/Errors'
const data = {
  email: '',
  password: '',
}
const LoginModal = () => {
  const dispatch = useDispatch()
  const [values, setValues] = useState(data)
  const userData = useSelector((store) => store.users)
  const { loading, appErr, serverErr, registered, userAuth } = userData
  const login = () => {
    dispatch(loginUserAction(values))
  }
  if (userAuth) {
    dispatch(setShowLoginModal(false))
  }
  const handleChange = ({ currentTarget: input }) => {
    setValues({ ...values, [input.name]: input.value })
  }
  const body = (
    <div className='flex flex-col space-y-4'>
      {appErr && <Errors errors={appErr} />}
      <Input
        placeholder='Email'
        name='email'
        onChange={handleChange}
        value={values.email}
        disabled={loading}
      />
      <Input
        placeholder='Password'
        type='password'
        name='password'
        onChange={handleChange}
        value={values.password}
        disabled={loading}
      />
      <div className='flex justify-center'>
        <Button label='Sign In' disabled={loading} primary onClick={login} />
      </div>
      <div className='text-neutral-700 text-center'>
        New here?{' '}
        <span
          className='text-sky-500 font-semibold cursor-pointer hover:underline'
          onClick={() => dispatch(toggleLoginRegister())}
        >
          Create an account
        </span>
      </div>
    </div>
  )

  return (
    <ModalLayout
      title='Login'
      body={body}
      close={() => dispatch(setShowLoginModal(false))}
    />
  )
}

export default LoginModal
