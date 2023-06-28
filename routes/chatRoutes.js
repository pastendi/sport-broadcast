const express = require('express')
const router = express.Router()
const { auth, adminCheck } = require('../middlewares/authHandler')

const { createChat, getAllChats } = require('../controllers/chatController')

router.route('/').post(auth, createChat)
router.route('/all/:videoId').get(getAllChats)
module.exports = router
