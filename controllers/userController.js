const User = require('../models/User')
const { createJWT } = require('../token')
const {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} = require('../errors')
const { StatusCodes } = require('http-status-codes')

// register
const register = async (req, res) => {
  const { email } = req?.body
  const userExist = await User.findOne({ email })
  if (userExist)
    throw new BadRequestError('Account with this email already exist')
  const user = await User.create({ ...req.body, isActive: true })
  const token = createJWT(user._id)
  await User.findOneAndUpdate({ email }, { $set: { isActive: true } })
  res.status(StatusCodes.CREATED).json({
    username: user.firstName,
    email: user.email,
    token,
    msg: 'User registered successfully',
  })
}
const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new UnauthenticatedError('Please provide email and password')
  }
  const user = await User.findOne({ email }).select('+password')
  if (user.isBlocked) {
    throw new UnauthorizedError('Currently you are blocked')
  }
  const isPasswordCorrect = await user?.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  await User.findOneAndUpdate({ email }, { $set: { isActive: true } })
  const token = createJWT(user._id)
  res.status(StatusCodes.OK).json({
    username: user.firstName,
    email: user.email,
    token,
    msg: 'Login successful',
  })
}
const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.userId, { $set: { isActive: false } })
  res.status(StatusCodes.OK).json({ msg: 'Logout successful' })
}
const adminLogin = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new UnauthenticatedError('Please provide email and password')
  }
  const user = await User.findOne({ email }).select('+password')
  if (!user.isAdmin) {
    throw new UnauthorizedError('Sorry but you are not admin')
  }
  const isPasswordCorrect = await user?.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const token = createJWT(user._id)
  res.status(StatusCodes.OK).json({
    username: user.firstName,
    email: user.email,
    token,
    msg: 'Login successful',
  })
}
const getUsers = async (req, res) => {
  const users = await User.find({ isAdmin: false })
  res.json(users)
}
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body
  const user = await User.findById(req.user?.id)
  const matchPassword = await user.comparePassword(oldPassword)
  if (!matchPassword)
    throw new UnauthenticatedError(`Old password didn't match`)
  user.password = newPassword
  const updateUser = await user.save()
  res
    .status(StatusCodes.OK)
    .json({ updateUser, msg: 'Password changed successfully' })
}

const blockUnblock = async (req, res) => {
  const userId = req.params.userId
  const user = await User.findById(userId)
  if (user.isBlocked) {
    await User.findByIdAndUpdate(userId, {
      $set: { isBlocked: false },
    })
    res.status(StatusCodes.OK).json('The user is unblocked')
  } else {
    await User.findByIdAndUpdate(userId, {
      $set: { isBlocked: true },
    })
    res.status(StatusCodes.OK).json('The user is blocked')
  }
}
const getUser = async (req, res) => {
  const user = await User.findById(req.params.id)
  res.json({ user })
}

module.exports = {
  register,
  login,
  getUsers,
  changePassword,
  blockUnblock,
  getUser,
  adminLogin,
  logout,
}
