const express = require('express')
const router = express.Router()
const { auth, adminCheck } = require('../middlewares/authHandler')
const uploadImage = require('../middlewares/uploadImage')
const resizeVideoImage = require('../middlewares/resizeVideoImage')
const {
  createVideo,
  updateVideo,
  getAllVideos,
  getVideo,
  deleteVideo,
  likeVideo,
  disLikeVideo,
} = require('../controllers/videoController')

router
  .route('/')
  .post(adminCheck, uploadImage.single('image'), resizeVideoImage, createVideo)
  .get(getAllVideos)
router
  .route('/:id')
  .patch(adminCheck, uploadImage.single('image'), resizeVideoImage, updateVideo)
  .get(getVideo)
  .delete(adminCheck, deleteVideo)
router.route('/like/:id').get(auth, likeVideo)
router.route('/dislike/:id').get(auth, disLikeVideo)

module.exports = router
