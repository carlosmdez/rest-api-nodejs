const jwt = require('jsonwebtoken')

const { User } = require('../models')

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
  const authToken = req.header('Authorization')
  const secret = process.env.SECRETKEY
  if (!authToken || !authToken.includes('Bearer '))
    return res.status(401).json({ message: 'Unauthorized' })
  try {
    const token = authToken.replace('Bearer ', '')
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
