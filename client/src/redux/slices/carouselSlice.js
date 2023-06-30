import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { baseUrl } from '../../constants'
import axios from 'axios'
import { setShowEditCarouselModel } from './appSlice'
import { toast } from 'react-toastify'
export const fetchCarousels = createAsyncThunk(
  'carousels/getAll',
  async (image, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/carousel`)
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)
export const changeCarausel = createAsyncThunk(
  'carousels/update',
  async (formData, { rejectWithValue, getState, dispatch }) => {
    const userStore = getState()?.users
    const { userAuth } = userStore
    const appStore = getState()?.app
    const { selected } = appStore
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: userAuth ? `Bearer ${userAuth.token}` : null,
      },
    }
    try {
      const { data } = await axios.patch(
        `${baseUrl}/api/carousel/${selected?._id}`,
        formData,
        config
      )
      dispatch(setShowEditCarouselModel({ show: false }))
      dispatch(fetchCarousels())
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)
const carouselSlice = createSlice({
  name: 'carousels',
  initialState: {
    carousels: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarousels.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchCarousels.fulfilled, (state, action) => {
        state.loading = false
        state.carousels = action?.payload
      })
      .addCase(fetchCarousels.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
      .addCase(changeCarausel.pending, (state, action) => {
        state.loading = true
      })
      .addCase(changeCarausel.fulfilled, (state, action) => {
        toast.success(action.payload.msg)
        state.loading = false
      })
      .addCase(changeCarausel.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
  },
})

export default carouselSlice.reducer
