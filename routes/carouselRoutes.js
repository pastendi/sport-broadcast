const express = require('express')
const router = express.Router()
const { auth, adminCheck } = require('../middlewares/authHandler')
const uploadImage = require('../middlewares/uploadImage')
const resizeCarouselImage = require('../middlewares/resizeCarouselImage')
const {
  createCarousel,
  updateCarousel,
  getAllCarousels,
} = require('../controllers/carouselController')

router
  .route('/')
  .post(
    adminCheck,
    uploadImage.single('image'),
    resizeCarouselImage,
    createCarousel
  )
  .get(getAllCarousels)
router
  .route('/:id')
  .patch(
    adminCheck,
    uploadImage.single('image'),
    resizeCarouselImage,
    updateCarousel
  )

module.exports = router
