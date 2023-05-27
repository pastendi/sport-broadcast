const express = require('express')
const router = express.Router()
const { adminCheck } = require('../middlewares/authHandler')

const {
  createComment,
  deleteComment,
  getAllComments,
} = require('../controllers/commentController')

router.route('/').post(createComment)
router.route('/all/:videoId').get(getAllComments)
router.route('/:id').delete(adminCheck, deleteComment)

module.exports = router
