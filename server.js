const express = require('express')
const connectDB = require('./connectDB')
const cors = require('cors')
require('express-async-errors')
require('dotenv').config()
const errorHandler = require('./middlewares/errorHandler')
const notFound = require('./middlewares/notFound')
const socket = require('socket.io')
const app = express()
app.use(express.json())
app.use(cors())
// routes
const userRouter = require('./routes/userRoutes')
const sportRouter = require('./routes/sportRoutes')
const videoRouter = require('./routes/videoRoutes')
const commentRouter = require('./routes/commentRoutes')
const carouselRouter = require('./routes/carouselRoutes')
const chatRouter = require('./routes/chatRoutes')
// pipelines
app.get('/', (req, res) => {
  res.json('hello')
})
app.use('/api/user', userRouter)
app.use('/api/sport', sportRouter)
app.use('/api/video', videoRouter)
app.use('/api/comment', commentRouter)
app.use('/api/carousel', carouselRouter)
app.use('/api/chat', chatRouter)
// middleware
app.use(notFound)
app.use(errorHandler)
connectDB()
const port = process.env.PORT || 5000
const server = app.listen(
  port,
  console.log(`Server is running at port ${port}`)
)

const io = socket(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:5173',
  },
})

io.on('connection', (socket) => {
  console.log('connected')
  socket.on('newChat', (newChat) => {
    io.emit('newMessage', newChat)
  })
})
