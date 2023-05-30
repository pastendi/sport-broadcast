import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import appReducer from './slices/appSlice'
import videoReducer from './slices/videoSlice'
const store = configureStore({
  reducer: {
    users: userReducer,
    app: appReducer,
    videos: videoReducer,
  },
})

export default store
