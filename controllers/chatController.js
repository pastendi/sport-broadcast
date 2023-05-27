const { StatusCodes } = require('http-status-codes')
const Chat = require('../models/Chat')
const createChat = async (req, res) => {
  await Chat.create({ ...req.body, userId: req.userId })
  res.status(StatusCodes.CREATED).json({ msg: 'Chat message added' })
}
const getAllChats = async (req, res) => {
  const chats = await Chat.find({ videoId: req.params.videoId }).sort({
    createdAt: -1,
  })
  res.status(StatusCodes.OK).json({ chats })
}
const deleteChat = async (req, res) => {
  await Chat.findByIdAndDelete(req.params.id)
  res.status(StatusCodes.CREATED).json({ msg: 'Chat message deleted' })
}
module.exports = { createChat, deleteChat, getAllChats }
