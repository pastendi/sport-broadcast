const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Video title required'],
    },
    description: {
      type: String,
      required: [true, 'Video description required'],
    },
    thumbnail: {
      type: String,
      required: [true, 'Thumbnail required'],
    },
    cloudinaryName: {
      type: String,
    },
    sport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sport',
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    disLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
)

module.exports = mongoose.model('Video', VideoSchema)
