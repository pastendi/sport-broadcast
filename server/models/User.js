const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name required'],
    },
    email: {
      type: String,
      required: [true, 'Email required'],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'Please enter a valid email address',
      },
    },
    password: {
      type: String,
      required: [true, 'Password required'],
      validate: {
        validator: function (value) {
          return validator.isStrongPassword(value, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          })
        },
        message:
          ' Password must be at least 6 characters long and contain, at least one uppercase letter, one lowercase letter, one number, one special charaters',
      },
      select: false,
    },
    favorites: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Video',
        },
      ],
      default: [],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
)

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}
module.exports = mongoose.model('User', UserSchema)
