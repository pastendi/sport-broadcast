const { StatusCodes } = require('http-status-codes')
const Chat = require('../models/Chat')
const Filter = require('bad-words')
const filter = new Filter()
const createChat = async (req, res) => {
  if (!req.body.message) {
    throw new BadRequestError('Chat cannot be empty')
  }
  const cleanMessage = filter.clean(req.body.message)
  await Chat.create({
    ...req.body,
    message: cleanMessage,
    user: req.userId,
  })
  res.status(StatusCodes.CREATED).json({ msg: 'Chat message added' })
}
const getAllChats = async (req, res) => {
  const chats = await Chat.find({ video: req.params.videoId }).populate({
    path: 'user',
    select: ['firstName', 'email'],
  })
  res.status(StatusCodes.OK).json({ chats })
}
module.exports = { createChat, getAllChats }
