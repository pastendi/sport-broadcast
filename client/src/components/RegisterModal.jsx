import { useState } from 'react'
import Input from './Form/Input'
import Button from './Form/Button'
import ModalLayout from './ModalLayout'
import { useDispatch, useSelector } from 'react-redux'
import { registerUserAction } from '../redux/slices/userSlice'
import {
  setShowRegisterModal,
  toggleLoginRegister,
} from '../redux/slices/appSlice'
const initial = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  cPassword: '',
}
const RegisterModal = () => {
  const dispatch = useDispatch()
  const [values, setValues] = useState(initial)

  const userData = useSelector((store) => store.users)
  const { loading, appErr, serverErr, registered } = userData
  const register = () => {
    dispatch(registerUserAction(values))
  }
  const handleChange = ({ currentTarget: input }) => {
    setValues({ ...values, [input.name]: input.value })
  }
  const body = (
    <div className='flex flex-col space-y-4'>
      {appErr ? <h1 className='text-red-800'>{appErr}</h1> : null}
      <Input
        placeholder='First name'
        name='firstName'
        onChange={handleChange}
        value={values.firstName}
        disabled={loading}
      />
      <Input
        placeholder='Last name'
        name='lastName'
        onChange={handleChange}
        value={values.lastName}
        disabled={loading}
      />
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
      <Input
        placeholder='Confirm Password'
        type='password'
        name='cPassword'
        onChange={handleChange}
        value={values.cPassword}
        disabled={loading}
      />
      <div className='flex justify-center'>
        <Button label='Sign Up' disabled={loading} onClick={register} />
      </div>
      <div className='text-neutral-700 text-center'>
        Already have an account?{' '}
        <span
          className='text-emerald-500 font-semibold cursor-pointer hover:underline'
          onClick={() => dispatch(toggleLoginRegister())}
        >
          Sign In
        </span>
      </div>
    </div>
  )

  return (
    <ModalLayout
      title='Create new account'
      body={body}
      close={() => dispatch(setShowRegisterModal(false))}
    />
  )
}

export default RegisterModal
