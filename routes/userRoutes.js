const express = require('express')
const router = express.Router()

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
router.route('/').get(getUsers)
router.route('/:id').get(getUser)
router.route('/block-unblock').patch(blockUnblock)
router.route('/change-password').patch(changePassword)

module.exports = router
