const express = require('express')
const router = express.Router()
const { auth, adminCheck } = require('../middlewares/authHandler')

const {
  createMessage,
  getAllMessages,
} = require('../controllers/messageController')

router.route('/').post(createMessage)
router.route('/').get(adminCheck, getAllMessages)
module.exports = router
