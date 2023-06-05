import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    selected: {},
    showLoginModal: false,
    showAddVideoModal: false,
    showEditVideoModal: false,
    showRegisterModal: false,
    showBlockConfirmationModal: false,
    showEditCarouselModel: false,
    currentPage: 'Dashboard',
  },
  reducers: {
    setShowLoginModal: (state, action) => {
      state.showLoginModal = action.payload
    },
    setShowRegisterModal: (state, action) => {
      state.showRegisterModal = action.payload
    },
    setShowBlockConfirmationModal: (state, action) => {
      state.selected = action.payload.user
      state.showBlockConfirmationModal = action.payload.show
    },
    setShowEditCarouselModel: (state, action) => {
      state.selected = action.payload.image
      state.showEditCarouselModel = action.payload.show
    },
    setShowAddVideoModal: (state, action) => {
      state.showAddVideoModal = action.payload
    },
    setShowEditVideoModal: (state, action) => {
      state.selected = action.payload.video
      state.showEditVideoModal = action.payload.show
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
  setShowBlockConfirmationModal,
  setShowEditCarouselModel,
  setShowAddVideoModal,
  setShowEditVideoModal,
} = appSlice.actions

export default appSlice.reducer
