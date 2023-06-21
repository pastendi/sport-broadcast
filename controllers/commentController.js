const Comment = require('../models/Comment')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const Filter = require('bad-words')
const filter = new Filter()

const createComment = async (req, res) => {
  const { comment, videoId } = req.body
  console.log()
  if (!comment) {
    throw new BadRequestError('Comment cannot be empty')
  }
  const cleanComment = filter.clean(comment)
  const newComment = await Comment.create({
    comment: cleanComment,
    user: req.userId,
    video: videoId,
  })
  res
    .status(StatusCodes.CREATED)
    .json({ comment: newComment, msg: 'Comment added' })
}

const getAllComments = async (req, res) => {
  const comments = await Comment.find({
    video: req.params.videoId,
  })
    .populate({ path: 'user', select: ['firstName', 'email'] })
    .sort({
      createdAt: -1,
    })
  res.status(StatusCodes.OK).json({ comments })
}
const deleteComment = async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.id)
  res.status(StatusCodes.OK).json({ comment })
}

module.exports = { createComment, getAllComments, deleteComment }
