const express = require('express')
const router = express.Router()
const { auth, adminCheck } = require('../middlewares/authHandler')

const {
  createChat,
  deleteChat,
  getAllChats,
} = require('../controllers/chatController')

router.route('/').post(auth, createChat)
router.route('/all/:videoId').get(getAllChats)
router.route('/:id').delete(adminCheck, deleteChat)
module.exports = router
