const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  pass: {
    type: String,
    required: [true, 'Pass is required']
  },
  img: {
    type: String
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN', 'USER']
  },
  state: {
    type: Boolean,
    default: true
  },
  googleAuth: {
    type: Boolean,
    default: false
  }
})

module.exports = model('User', UserSchema)
