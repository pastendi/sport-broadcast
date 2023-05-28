import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// register action

export const registerUserAction = createAsyncThunk(
  'user/register',
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        'http://localhost:5000/api/user/register',
        user,
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

// Slice

const userSlice = createSlice({
  name: 'users',
  initialState: {
    userAuth: 'login',
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false
      state.registered = action?.payload
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.msg
      state.serverErr = action?.error?.message
    })
  },
})

export default userSlice.reducer
