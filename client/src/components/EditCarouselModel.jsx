import ModalLayout from './ModalLayout'
import { useDispatch, useSelector } from 'react-redux'
import { setShowEditCarouselModel } from '../redux/slices/appSlice'
import { useState } from 'react'
import { changeCarausel } from '../redux/slices/carouselSlice'
const EditCarouselModel = () => {
  const [image, setImage] = useState(null)
  const dispatch = useDispatch()
  const store = useSelector((store) => store.app)
  const { selected } = store
  const updateCarousel = async () => {
    if (!image) return
    const formData = new FormData()
    formData.append('image', image)
    dispatch(changeCarausel(formData))
  }
  const body = (
    <div className='flex flex-col space-y-4'>
      <p>Caution, that the old image will be removed completely !!!</p>
      <div>
        <input
          type='file'
          required
          name='img'
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <div className='flex justify-center space-x-4'>
        <button className='btn bg-emerald-500' onClick={updateCarousel}>
          Replace
        </button>
        <button
          className='btn bg-red-500'
          onClick={() => dispatch(setShowEditCarouselModel({ show: false }))}
        >
          Cancel
        </button>
      </div>
    </div>
  )
  if (!selected) return null
  return (
    <ModalLayout
      title='Edit carousel'
      body={body}
      close={() => dispatch(setShowEditCarouselModel({ show: false }))}
    />
  )
}

export default EditCarouselModel
