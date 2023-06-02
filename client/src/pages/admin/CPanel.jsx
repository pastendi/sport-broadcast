import React, { useState } from 'react'
import Errors from '../../components/Form/Errors'
import Input from '../../components/Form/Input'
import Button from '../../components/Form/Button'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { loginAdminAction } from '../../redux/slices/userSlice'
import { logo } from '../../assets'
const data = {
  email: '',
  password: '',
}
const CPanel = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [values, setValues] = useState(data)
  const userData = useSelector((store) => store.users)
  const { loading, appErr, serverErr, registered, userAuth } = userData

  const handleChange = ({ currentTarget: input }) => {
    setValues({ ...values, [input.name]: input.value })
  }
  if (userAuth) {
    navigate('/admin/')
  }
  return (
    <div className='fixed inset-0 flex justify-center items-center'>
      <div className=' flex w-[500px]  items-center rounded-xl flex-col space-y-4 mx-auto bg-blue-500 p-6'>
        <div className=' flex justify-center w-44 h-28'>
          <img src={logo} alt='logo' />
        </div>
        <p className='text-4xl text-white font-bold'>Fun Olympic</p>
        <p className=' text-2xl text-white font-bold'>Admin login</p>
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
          <Button
            label='Sign In'
            disabled={loading}
            primary
            onClick={() => {
              dispatch(loginAdminAction(values))
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CPanel
