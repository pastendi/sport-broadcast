import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from '../../constants'

export const getChats = createAsyncThunk(
  'chat/get all chats',
  async (videoId, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/chat/all/${videoId}`)
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)
export const addChat = createAsyncThunk(
  'chat/add chat message',
  async (chat, { rejectWithValue, getState, dispatch }) => {
    const userStore = getState()?.users
    const { userAuth } = userStore
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userAuth ? `Bearer ${userAuth.token}` : null,
      },
    }
    try {
      const { data } = await axios.post(`${baseUrl}/api/chat`, chat, config)
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)

const chatSlice = createSlice({
  name: 'chats',
  initialState: {
    chats: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChats.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.loading = false
        state.chats = action?.payload.chats
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(getChats.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
  },
})

export default chatSlice.reducer
