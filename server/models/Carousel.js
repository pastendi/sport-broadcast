const mongoose = require('mongoose')
const carouselSchema = mongoose.Schema(
  {
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
