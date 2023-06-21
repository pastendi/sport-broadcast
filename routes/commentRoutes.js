const express = require('express')
const router = express.Router()
const { auth, adminCheck } = require('../middlewares/authHandler')

const {
  createComment,
  deleteComment,
  getAllComments,
} = require('../controllers/commentController')

router.route('/').post(auth, createComment)
router.route('/all/:videoId').get(getAllComments)
router.route('/:id').delete(adminCheck, deleteComment)

module.exports = router
