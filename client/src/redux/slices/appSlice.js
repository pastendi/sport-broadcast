import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    showLoginModal: false,
    showRegisterModal: false,
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
  },
})
export const { setShowLoginModal, setShowRegisterModal, toggleLoginRegister } =
  appSlice.actions
export default appSlice.reducer
