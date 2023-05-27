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
    live: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      required: [true, 'Url of video is required'],
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
VideoSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'videoId',
  localField: '_id',
})
VideoSchema.virtual('chats', {
  ref: 'Chat',
  foreignField: 'videoId',
  localField: '_id',
})
module.exports = mongoose.model('Video', VideoSchema)
