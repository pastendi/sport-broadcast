const express = require('express')
const router = express.Router()
const { auth, adminCheck } = require('../middlewares/authHandler')

const {
  register,
  login,
  getUsers,
  changePassword,
  blockUnblock,
  getUser,
  adminLogin,
  logout,
  handleFavorite,
} = require('../controllers/userController')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(auth, logout)
router.route('/admin/login').post(adminLogin)
router.route('/').get(adminCheck, getUsers)
router.route('/:id').get(adminCheck, getUser)
router.route('/block-unblock/:userId').get(adminCheck, blockUnblock)
router.route('/favorite/:videoId').get(auth, handleFavorite)
router.route('/change-password').patch(changePassword)

module.exports = router
