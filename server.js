const express = require('express')
const connectDB = require('./connectDB')
const cors = require('cors')
require('express-async-errors')
require('dotenv').config()
const errorHandler = require('./middlewares/errorHandler')
const notFound = require('./middlewares/notFound')
const app = express()
app.use(express.json())
app.use(cors())
// routes

// pipelines
app.get('/', (req, res) => {
  res.json('hello')
})
// middleware
app.use(notFound)
app.use(errorHandler)
connectDB()
const port = process.env.PORT || 5000
app.listen(port, console.log(`Server is running at port ${port}`))
