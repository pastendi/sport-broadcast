import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from '../../constants'
import {
  setShowAddVideoModal,
  setShowEditVideoModal,
  setShowDeleteVideoModal,
} from './appSlice'

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
        Authorization: userAuth ? `Bearer ${userAuth.token}` : null,
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
export const updateVideoAction = createAsyncThunk(
  'videos/update',
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
        `${baseUrl}/api/video/${selected._id.toString()}`,
        formData,
        config
      )
      dispatch(setShowEditVideoModal({ show: false }))
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
export const deleteVideoAction = createAsyncThunk(
  'videos/delete',
  async (id, { rejectWithValue, getState, dispatch }) => {
    const userStore = getState()?.users
    const { userAuth } = userStore
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: userAuth ? `Bearer ${userAuth.token}` : null,
      },
    }
    try {
      const { data } = await axios.delete(`${baseUrl}/api/video/${id}`, config)
      dispatch(setShowDeleteVideoModal({ show: false }))
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
  initialState: {
    videoList: [],
    filteredList: [],
  },
  reducers: {
    filterVideos: (state, action) => {
      let filtered = [...state.videoList]
      if (action.payload.sport !== 'all') {
        filtered = filtered?.filter(
          (video) => video.sport._id === action.payload.sport
        )
      }
      filtered = filtered?.filter((video) =>
        video.title.toLowerCase().startsWith(action.payload.text)
      )
      state.filteredList = filtered
    },
    sortByLengthOf: (state, action) => {
      let result = [...state.filteredList]
      if (state.previousFilterField === action.payload && state.descOrder) {
        state.descOrder = false
        result = result.sort(
          (a, b) => a[action.payload].length - b[action.payload].length
        )
      } else {
        state.descOrder = true
        state.previousFilterField = action.payload
        result = result.sort(
          (a, b) => b[action.payload].length - a[action.payload].length
        )
      }
      state.filteredList = result
    },
    sortByView: (state, action) => {
      let result = [...state.filteredList]
      if (state.descOrder) {
        state.descOrder = false
        result = result.sort((a, b) => a.views - b.views)
      } else {
        state.descOrder = true
        result = result.sort((a, b) => b.views - a.views)
      }
      state.filteredList = result
    },
    sortByDate: (state, action) => {
      let result = [...state.filteredList]
      if (state.descOrder) {
        state.descOrder = false
        result = result.sort(
          (a, b) =>
            Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
        )
      } else {
        state.descOrder = true
        result = result.sort(
          (a, b) =>
            Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
        )
      }
      state.filteredList = result
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideosAction.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchVideosAction.fulfilled, (state, action) => {
        state.loading = false
        state.videoList = action?.payload.videos
        state.filteredList = [...state.videoList]
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
      .addCase(updateVideoAction.pending, (state, action) => {
        state.loading = true
      })
      .addCase(updateVideoAction.fulfilled, (state, action) => {
        state.loading = false
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(updateVideoAction.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
      .addCase(deleteVideoAction.pending, (state, action) => {
        state.loading = true
      })
      .addCase(deleteVideoAction.fulfilled, (state, action) => {
        state.loading = false
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(deleteVideoAction.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
  },
})
export const { filterVideos, sortByLengthOf, sortByView, sortByDate } =
  videoSlice.actions
export default videoSlice.reducer
