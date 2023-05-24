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
} = require('../controllers/userController')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/').get(adminCheck, getUsers)
router.route('/:id').get(adminCheck, getUser)
router.route('/block-unblock').patch(blockUnblock)
router.route('/change-password').patch(changePassword)

module.exports = router
