const express = require('express')
const router = express.Router()
const { adminCheck } = require('../middlewares/authHandler')

const {
  createSport,
  updateSport,
  getSport,
  getAllSports,
} = require('../controllers/sportController')

router.route('/').post(adminCheck, createSport).get(getAllSports)
router.route('/:id').patch(adminCheck, updateSport).get(adminCheck, getSport)

module.exports = router
