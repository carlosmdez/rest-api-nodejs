const jwt = require('jsonwebtoken')

const User = require('../models/user')

const generateJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid }
    const secret = process.env.SECRETKEY
    const options = { expiresIn: '4h' }
    const callback = (err, token) => {
      if (err) {
        console.log(err)
        reject('Failed to generate token')
      } else {
        resolve(token)
      }
    }
    jwt.sign(payload, secret, options, callback)
  })
}

const validateJWT = async (req, res, next) => {
  const token = req.header('Authorization')
  const secret = process.env.SECRETKEY
  if (!token) return res.status(401).json({ message: 'Unauthorized' })
  try {
    const { uid } = jwt.verify(token, secret)
    const authUser = await User.findById(uid)
    if (!authUser?.status)
      return res.status(401).json({ message: 'Unauthorized' })
    req.authUser = authUser
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: 'Token no valid' })
  }
}

module.exports = { generateJWT, validateJWT }
