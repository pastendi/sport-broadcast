const express = require('express')
const router = express.Router()
const { adminCheck } = require('../middlewares/authHandler')

const {
  createComment,
  getComment,
  deleteComment,
  getAllComments,
} = require('../controllers/commentController')

router.route('/').post(createComment)
router.route('/all/:id').get(getAllComments)
router
  .route('/:id')
  .delete(adminCheck, deleteComment)
  .get(adminCheck, getComment)

module.exports = router
