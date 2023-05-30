import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from '../../constants'

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
  },
})

export default videoSlice.reducer
