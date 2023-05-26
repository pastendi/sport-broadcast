const mongoose = require('mongoose')
const carouselSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Image title is required'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    cloudinaryName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Carousel', carouselSchema)
