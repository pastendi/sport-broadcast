const Sport = require('../models/Sport')
const { StatusCodes } = require('http-status-codes')

const createSport = async (req, res) => {
  const sport = await Sport.create(req.body)
  res.status(StatusCodes.CREATED).json({ sport, msg: 'Sport created' })
}
const updateSport = async (req, res) => {
  const sport = await Sport.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.status(StatusCodes.CREATED).json({ sport, msg: 'Sport updated' })
}
const getSport = async (req, res) => {
  const sport = await Sport.findById(req.params.id)
  res.status(StatusCodes.CREATED).json({ sport })
}
const getAllSports = async (req, res) => {
  const sports = await Sport.find({})
  res.status(StatusCodes.CREATED).json(sports)
}

module.exports = { createSport, updateSport, getSport, getAllSports }
