import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import appReducer from './slices/appSlice'
import videoReducer from './slices/videoSlice'
import carouselReducer from './slices/carouselSlice'
import sportReducer from './slices/sportSlice'
import commentReducer from './slices/commentSlice'
const store = configureStore({
  reducer: {
    users: userReducer,
    app: appReducer,
    videos: videoReducer,
    carousels: carouselReducer,
    sports: sportReducer,
    comments: commentReducer,
  },
})

export default store
