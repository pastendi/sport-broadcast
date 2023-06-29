import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from '../../constants'

export const getAllMessages = createAsyncThunk(
  'message/get all messages',
  async (values, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: userAuth ? `Bearer ${userAuth.token}` : null,
      },
    }
    try {
      const { data } = await axios.get(`${baseUrl}/api/message`, config)
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)
export const sendMessage = createAsyncThunk(
  'message/add message',
  async (values, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/message`,
        values,
        config
      )
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    success: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMessages.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.loading = false
        state.messages = action?.payload
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(getAllMessages.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
      .addCase(sendMessage.pending, (state, action) => {
        state.loading = true
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false
        state.success = action.payload.msg
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
  },
})

export default messageSlice.reducer
