import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from '../../constants'
import { setShowBlockConfirmationModal } from './appSlice'

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
        Authorization: userAuth ? `Bearer ${userAuth.token}` : null,
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
        Authorization: userAuth ? `Bearer ${userAuth.token}` : null,
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
export const blockUnblock = createAsyncThunk(
  'user/blockUnblock',
  async (userId, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: userAuth ? `Bearer ${userAuth.token}` : null,
      },
    }
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/user/block-unblock/${userId}`,
        config
      )
      dispatch(setShowBlockConfirmationModal({ show: false }))
      dispatch(fetchUsers())
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
    users: [],
    filteredUsers: [],
  },
  reducers: {
    filterUsers: (state, action) => {
      state.filteredUsers = [...state.users]?.filter(
        (user) =>
          user.firstName.toLowerCase().startsWith(action.payload) ||
          user.email.toLowerCase().startsWith(action.payload)
      )
    },
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
      // for fetching users
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action?.payload
        state.filteredUsers = [...state.users]
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
      // for blocking and unblocking users
      .addCase(blockUnblock.pending, (state, action) => {
        state.loading = true
      })
      .addCase(blockUnblock.fulfilled, (state, action) => {
        state.loading = false
        state.users = action?.payload
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(blockUnblock.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
  },
})
export const { filterUsers } = userSlice.actions
export default userSlice.reducer
