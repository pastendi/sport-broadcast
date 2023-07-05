const mongoose = require('mongoose')

const SportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Sport name required'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Sport', SportSchema)
