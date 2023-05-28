import { useState } from 'react'
import Input from './Form/Input'
import Button from './Form/Button'
import ModalLayout from './ModalLayout'
import { useDispatch, useSelector } from 'react-redux'
import {
  setShowLoginModal,
  toggleLoginRegister,
} from '../redux/slices/appSlice'
const data = {
  email: '',
  password: '',
}
const LoginModal = () => {
  const dispatch = useDispatch()
  const [values, setValues] = useState(data)
  const [loading, setLoading] = useState(false)
  const login = () => {
    console.log('login')
  }
  const handleChange = ({ currentTarget: input }) => {
    setValues({ ...values, [input.name]: input.value })
  }
  const body = (
    <div className='flex flex-col space-y-4'>
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
