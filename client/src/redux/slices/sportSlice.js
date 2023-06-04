import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from '../../constants'
export const fetchSportCategory = createAsyncThunk(
  'sports/getAll',
  async (sport, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/sport`)
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)
const sportSlice = createSlice({
  name: 'sports',
  initialState: {},
  extraReducers: (builder) => {
    // for fetching sport category
    builder
      .addCase(fetchSportCategory.pending, (state, action) => {
        state.loading = true
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(fetchSportCategory.fulfilled, (state, action) => {
        state.loading = false
        state.sports = action?.payload
        state.appErr = undefined
        state.serverErr = undefined
      })
      .addCase(fetchSportCategory.rejected, (state, action) => {
        state.loading = false
        state.appErr = action?.payload?.msg
        state.serverErr = action?.error?.message
      })
  },
})
export default sportSlice.reducer
