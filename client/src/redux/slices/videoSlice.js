import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from '../../constants'
import { setShowAddVideoModal } from './appSlice'

export const fetchVideosAction = createAsyncThunk(
  'video/list',
  async (video, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/video`)
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)
export const createNewVideo = createAsyncThunk(
  'videos/addNew',
  async (formData, { rejectWithValue, getState, dispatch }) => {
    const userStore = getState()?.users
    const { userAuth } = userStore
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userAuth.token}`,
      },
    }
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/video`,
        formData,
        config
      )
      dispatch(setShowAddVideoModal(false))
      dispatch(fetchVideosAction())
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)

const videoSlice = createSlice({
  name: 'videos',
  initialState: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideosAction.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchVideosAction.fulfilled, (state, action) => {
        state.loading = false
        state.videoList = action?.payload.videos
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(fetchVideosAction.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
      .addCase(createNewVideo.pending, (state, action) => {
        state.loading = true
      })
      .addCase(createNewVideo.fulfilled, (state, action) => {
        state.loading = false
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(createNewVideo.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
  },
})

export default videoSlice.reducer
