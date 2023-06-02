import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    showLoginModal: false,
    showRegisterModal: false,
    currentPage: 'Dashboard',
  },
  reducers: {
    setShowLoginModal: (state, action) => {
      state.showLoginModal = action.payload
    },
    setShowRegisterModal: (state, action) => {
      state.showRegisterModal = action.payload
    },
    toggleLoginRegister: (state) => {
      state.showLoginModal = !state.showLoginModal
      state.showRegisterModal = !state.showRegisterModal
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
})
export const {
  setShowLoginModal,
  setShowRegisterModal,
  toggleLoginRegister,
  setCurrentPage,
} = appSlice.actions

export default appSlice.reducer
