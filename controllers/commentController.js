const Comment = require('../models/Comment')
const { StatusCodes } = require('http-status-codes')
const Filter = require('bad-words')
const filter = new Filter()

const createComment = async (req, res) => {
  const { comment, videoId } = req.body
  const cleanComment = filter.clean(comment)
  const newComment = await Comment.create({
    comment: cleanComment,
    userId: req.userId,
    videoId,
  })
  res
    .status(StatusCodes.CREATED)
    .json({ comment: newComment, msg: 'Comment added' })
}

const getAllComments = async (req, res) => {
  const comments = await Comment.find({ videoId: req.params.videoId }).sort({
    createdAt: -1,
  })
  res.status(StatusCodes.OK).json({ comments })
}
const deleteComment = async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.id)
  res.status(StatusCodes.OK).json({ comment })
}

module.exports = { createComment, getAllComments, deleteComment }
