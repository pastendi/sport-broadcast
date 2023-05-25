const { StatusCodes } = require('http-status-codes')
const Video = require('../models/Video')
const createVideo = async (req, res) => {
  const video = await Video.create(req.body)
  res
    .status(StatusCodes.CREATED)
    .json({ video, msg: 'Video created successfully' })
}
const updateVideo = async (req, res) => {
  const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(StatusCodes.OK).json({ video, msg: 'Video updated successfully' })
}
const deleteVideo = async (req, res) => {
  const video = await Video.findByIdAndDelete(req.params.id)
  res.status(StatusCodes.OK).json({ video, msg: 'Video updated successfully' })
}
const getAllVideos = async (req, res) => {
  const videos = await Video.find({})
    .populate({ path: 'sport', select: ['name'] })
    .sort({ createdAt: -1 })
  res.status(StatusCodes.OK).json({ videos })
}
const getVideo = async (req, res) => {
  const video = await Video.findById(req.params.id)
  res.status(StatusCodes.OK).json({ video })
}

module.exports = {
  createVideo,
  updateVideo,
  getAllVideos,
  getVideo,
  deleteVideo,
}
