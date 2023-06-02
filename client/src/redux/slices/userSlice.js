import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from '../../constants'

// register action

export const registerUserAction = createAsyncThunk(
  'user/register',
  async (user, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/user/register`,
        user,
        config
      )
      // save user in local storage
      localStorage.setItem('user', JSON.stringify(data))
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)
// login action

export const loginUserAction = createAsyncThunk(
  'user/login',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/user/login`,
        userData,
        config
      )
      // save user in local storage
      localStorage.setItem('user', JSON.stringify(data))
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)
export const loginAdminAction = createAsyncThunk(
  'admin/login',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/user/admin/login`,
        userData,
        config
      )
      // save user in local storage
      localStorage.setItem('user', JSON.stringify(data))
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)
export const logoutAction = createAsyncThunk(
  'user/logout',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth.token}`,
      },
    }
    try {
      await axios.get(`${baseUrl}/api/user/logout`, config)
      // save user in local storage
      localStorage.removeItem('user')
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)
// get all users
export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth.token}`,
      },
    }
    try {
      const { data } = await axios.get(`${baseUrl}/api/user`, config)
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)

const storedUser = localStorage.getItem('user')
// Slice

const userSlice = createSlice({
  name: 'users',
  initialState: {
    userAuth: storedUser ? JSON.parse(storedUser) : null,
  },
  extraReducers: (builder) => {
    // for register
    builder
      .addCase(registerUserAction.pending, (state, action) => {
        state.loading = true
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.loading = false
        state.userAuth = action?.payload
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(registerUserAction.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
      // for user login
      .addCase(loginUserAction.pending, (state, action) => {
        state.loading = true
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.loading = false
        state.userAuth = action?.payload
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(loginUserAction.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
      // for admin login
      .addCase(loginAdminAction.pending, (state, action) => {
        state.loading = true
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(loginAdminAction.fulfilled, (state, action) => {
        state.loading = false
        state.userAuth = action?.payload
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(loginAdminAction.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
      // for logout
      .addCase(logoutAction.pending, (state, action) => {
        state.loading = true
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.loading = false
        state.userAuth = undefined
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
      // for logout
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action?.payload
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
  },
})

export default userSlice.reducer
