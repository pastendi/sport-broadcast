const sharp = require('sharp')
const path = require('path')
const resizeVideoImage = async (req, res, next) => {
  if (!req.file) return next()
  req.file.fileName = `${Date.now()}-${req.file.originalname}`
  await sharp(req.file.buffer)
    .resize(1200, 676, {
      kernel: sharp.kernel.nearest,
      fit: 'cover',
      position: 'top',
    })
    .toFormat('jpeg')
    .toFile(path.join(`temp/${req.file.fileName}`))
  next()
}

module.exports = resizeVideoImage
