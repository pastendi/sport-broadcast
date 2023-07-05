const mongoose = require('mongoose')
const validator = require('validator')
const MessageSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email required'],
      validate: {
        validator: validator.isEmail,
        message: 'Please enter a valid email address',
      },
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
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

module.exports = mongoose.model('Message', MessageSchema)
