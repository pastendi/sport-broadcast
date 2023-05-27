const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, 'Chat message required'],
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

module.exports = mongoose.model('Chat', ChatSchema)
