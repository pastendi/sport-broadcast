const express = require('express')
const router = express.Router()
const { auth, adminCheck } = require('../middlewares/authHandler')

const {
  createVideo,
  updateVideo,
  getAllVideos,
  getVideo,
  deleteVideo,
} = require('../controllers/videoController')

router.route('/').post(createVideo).get(getAllVideos)
router.route('/:id').patch(updateVideo).get(getVideo).delete(deleteVideo)

module.exports = router
