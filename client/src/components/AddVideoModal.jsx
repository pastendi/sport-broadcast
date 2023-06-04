import { useEffect, useState } from 'react'
import Button from './Form/Button'
import ModalLayout from './ModalLayout'
import { useDispatch, useSelector } from 'react-redux'
import { setShowAddVideoModal } from '../redux/slices/appSlice'
import Errors from './Form/Errors'
import { Checkbox, MenuItem, Select } from '@mui/material'
import { fetchSportCategory } from '../redux/slices/sportSlice'
import { createNewVideo, fetchVideosAction } from '../redux/slices/videoSlice'
const initial = {
  title: '',
  description: '',
  url: '',
  live: false,
  thumbnail: null,
  sport: null,
}
const AddVideoModal = () => {
  const dispatch = useDispatch()
  const [values, setValues] = useState(initial)

  const videoData = useSelector((store) => store.videos)
  const { loading, appErr, serverErr, registered } = videoData
  const sportData = useSelector((store) => store.sports)
  const { sports } = sportData
  const MenuProps = {
    PaperProps: {
      style: {
        width: 100,
        maxHeight: 200,
      },
    },
  }
  const handleChange = ({ currentTarget: input }) => {
    setValues({ ...values, [input.name]: input.value })
  }
  const addVideo = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('description', values.description)
    formData.append('url', values.url)
    formData.append('image', values.thumbnail)
    formData.append('live', values.live)
    formData.append('sport', values.sport)
    dispatch(createNewVideo(formData))
  }
  useEffect(() => {
    dispatch(fetchSportCategory())
  }, [dispatch])
  const body = (
    <form onSubmit={addVideo}>
      <div className='flex flex-col space-y-4'>
        {appErr && <Errors errors={appErr} />}
        <div className='flex space-x-2'>
          <label className='font-semibold'>Title:</label>
          <input
            name='title'
            className='flex-1 outline-none focus:border-sky-500 focus:border-[1px] p-1'
            onChange={handleChange}
            value={values.title}
          />
        </div>
        <div className='flex space-x-2'>
          <label className='font-semibold'>Description:</label>
          <textarea
            className='h-20 w-full outline-none focus:border-sky-500 focus:border-[1px] p-1'
            name='description'
            value={values.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className='flex space-x-2'>
          <label className='font-semibold'>Url:</label>
          <input
            name='url'
            className='flex-1 outline-none focus:border-sky-500 focus:border-[1px] p-1'
            onChange={handleChange}
            value={values.url}
          />
        </div>
        <div className='flex space-x-2'>
          <label className='font-semibold'>Sport:</label>
          <Select
            sx={{ width: 150, maxHeight: 100 }}
            size='small'
            name='sport'
            value={values.sport}
            required
            onChange={(e) => setValues({ ...values, sport: e.target.value })}
            MenuProps={MenuProps}
          >
            {sports?.map((sport, index) => (
              <MenuItem key={index} value={sport._id}>
                {sport.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className='flex float-left'>
          <div className='flex-1 flex items-center'>
            <p className='font-semibold'>Live:</p>
            <Checkbox
              checked={values.live}
              name='live'
              onChange={(e) => setValues({ ...values, live: e.target.checked })}
            />
          </div>
          <div className='flex-1 flex items-center space-x-2'>
            <p className='font-semibold'>Thumbnail:</p>
            <input
              type='file'
              name='thumbnail'
              onChange={(e) =>
                setValues({ ...values, thumbnail: e.target.files[0] })
              }
            />
          </div>
        </div>

        <div className='flex justify-center'>
          <button
            type='submit'
            className='btn bg-emerald-500'
            disabled={loading}
          >
            Add video
          </button>
        </div>
      </div>
    </form>
  )

  return (
    <ModalLayout
      title='Adding new video'
      body={body}
      close={() => dispatch(setShowAddVideoModal(false))}
    />
  )
}

export default AddVideoModal
