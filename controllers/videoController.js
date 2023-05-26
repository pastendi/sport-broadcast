const { StatusCodes } = require('http-status-codes')
const Video = require('../models/Video')
const { cloudinaryUpload, cloudinaryDelete } = require('../utils/cloudinary')
const removeFile = require('../utils/removeFile')

const createVideo = async (req, res) => {
  const storagePath = `temp/${req.file?.fileName}`
  const upload = await cloudinaryUpload(storagePath)
  if (upload) {
    removeFile(storagePath)
  }
  const video = await Video.create({
    ...req.body,
    thumbnail: upload?.url,
    cloudinaryName: upload?.cloudinaryName,
  })
  res
    .status(StatusCodes.CREATED)
    .json({ video, msg: 'Video created successfully' })
}
const updateVideo = async (req, res) => {
  let video = await Video.findById(req.params.id)
  if (req.file) {
    //deleting old image in cloudinary
    cloudinaryDelete(video.cloudinaryName)
    //upload to cloudinary
    const storagePath = `temp/${req.file.fileName}`
    const upload = await cloudinaryUpload(storagePath)
    removeFile(storagePath) //remove temp file
    video = await Video.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        thumbnail: upload?.url,
        cloudinaryName: upload?.cloudinaryName,
      },
      { new: true }
    )
  } else {
    video = await Video.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    )
  }
  res.status(StatusCodes.OK).json({ video, msg: 'Video updated successfully' })
}
const deleteVideo = async (req, res) => {
  const video = await Video.findByIdAndDelete(req.params.id)
  //deleting old image in cloudinary
  cloudinaryDelete(video.cloudinaryName)
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
    .populate({
      path: 'comments',
      options: { sort: { createdAt: -1 } },
      populate: { path: 'userId', select: ['firstName', 'email'] },
    })
    .sort({})
  res.status(StatusCodes.OK).json({ video })
}

module.exports = {
  createVideo,
  updateVideo,
  getAllVideos,
  getVideo,
  deleteVideo,
}
