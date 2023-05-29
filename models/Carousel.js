const mongoose = require('mongoose')
const carouselSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Image title is required'],
    },
    src: {
      type: String,
      required: [true, 'Image source is required'],
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
