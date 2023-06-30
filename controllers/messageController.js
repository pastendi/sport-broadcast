const { StatusCodes } = require('http-status-codes')
const Message = require('../models/Message')
const Filter = require('bad-words')
const filter = new Filter()
const createMessage = async (req, res) => {
  let { message, subject, email } = req.body
  if (message) {
    message = filter.clean(message)
  }
  await Message.create({
    subject,
    message,
    email,
  })
  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'Message sent to admin successfully' })
}
const getAllMessages = async (req, res) => {
  const messages = await Message.find().sort({
    createdAt: -1,
  })
  res.status(StatusCodes.OK).json(messages)
}
module.exports = { createMessage, getAllMessages }
