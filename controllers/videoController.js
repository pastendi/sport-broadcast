const Video = require('../models/Video')
const { StatusCodes } = require('http-status-codes')
const { cloudinaryUpload, cloudinaryDelete } = require('../utils/cloudinary')
const removeFile = require('../utils/removeFile')

const createVideo = async (req, res) => {
  console.log(req.body)
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
  res.status(StatusCodes.OK).json({ video, msg: 'Video deleted successfully' })
}
const getAllVideos = async (req, res) => {
  const videos = await Video.find({})
    .populate({ path: 'sport', select: ['name'] })
    .populate({
      path: 'comments',
      options: { sort: { createdAt: -1 } },
      populate: { path: 'user', select: ['firstName', 'email'] },
    })
    .sort({ createdAt: -1 })
  res.status(StatusCodes.OK).json({ videos })
}
const getVideo = async (req, res) => {
  const video = await Video.findById(req.params.id)
  let recommendation = await Video.find({
    $and: [{ sport: video.sport }, { _id: { $ne: req.params.id } }],
  })
  await Video.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } })
  res.status(StatusCodes.OK).json({ video, recommendation })
}

module.exports = {
  createVideo,
  updateVideo,
  getAllVideos,
  getVideo,
  deleteVideo,
}
