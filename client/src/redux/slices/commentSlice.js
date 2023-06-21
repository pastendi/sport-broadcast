import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from '../../constants'

export const getAllComments = createAsyncThunk(
  'comment/ getallComments',
  async (videoId, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/comment/all/${videoId}`)
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)
export const addComment = createAsyncThunk(
  'comment/ addComment',
  async (comment, { rejectWithValue, getState, dispatch }) => {
    const userStore = getState()?.users
    const { userAuth } = userStore
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userAuth ? `Bearer ${userAuth.token}` : null,
      },
    }
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/comment`,
        comment,
        config
      )
      dispatch(getAllComments(comment.videoId))
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllComments.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.loading = false
        state.comments = action?.payload.comments
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
      .addCase(addComment.pending, (state, action) => {
        state.loading = true
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
  },
})

export default commentSlice.reducer