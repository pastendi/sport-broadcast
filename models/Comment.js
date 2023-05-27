const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'Comment message required'],
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
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

module.exports = mongoose.model('Comment', CommentSchema)