const Carousel = require('../models/Carousel')
const { StatusCodes } = require('http-status-codes')
const { cloudinaryUpload, cloudinaryDelete } = require('../utils/cloudinary')
const removeFile = require('../utils/removeFile')

const createCarousel = async (req, res) => {
  //upload to cloudinary
  const storagePath = `temp/${req.file?.fileName}`
  const upload = await cloudinaryUpload(storagePath)
  if (upload) {
    removeFile(storagePath)
  }
  const carousel = await Carousel.create({
    ...req.body,
    image: upload?.url,
    cloudinaryName: upload?.cloudinaryName,
  })
  res
    .status(StatusCodes.CREATED)
    .json({ carousel, msg: 'Carousel created successfully' })
}
const updateCarousel = async (req, res) => {
  //upload to cloudinary
  const storagePath = `temp/${req.file?.fileName}`
  const upload = await cloudinaryUpload(storagePath)
  if (upload) {
    removeFile(storagePath)
  }
  const carousel = await Carousel.findByIdAndUpdate(req.params.id, {
    ...req.body,
    image: upload?.url,
    cloudinaryName: upload?.cloudinaryName,
  })
  //deleting old image in cloudinary
  cloudinaryDelete(carousel.cloudinaryName)
  res.status(StatusCodes.OK).json({ msg: 'Carousel updated successfully' })
}
const getAllCarousels = async (req, res) => {
  const carousels = await Carousel.find()
  res.status(StatusCodes.OK).json({ carousels })
}
module.exports = {
  createCarousel,
  updateCarousel,
  getAllCarousels,
}
