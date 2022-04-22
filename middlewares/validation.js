const { validationResult } = require('express-validator')

const validateFields = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }
  next()
}

const validateFile = (req, res, next) => {
  const { files } = req
  if (!files || Object.keys(files).length === 0) {
    return res
      .status(400)
      .json({ ok: false, message: 'No files were uploaded.' })
  } else if (!files.file) {
    return res
      .status(400)
      .json({ ok: false, message: `'file' prop is expected.` })
  }
  next()
}

const isAdminRole = (req, res, next) => {
  if (!req?.authUser) {
    return res.status(500).json({ message: 'Token not verified' })
  }
  const { role, name } = req.authUser
  if (role !== 'ADMIN') {
    return res.status(401).json({ message: `User ${name} is not authorized` })
  }
  next()
}

const allowRoles = (...args) => {
  return (req, res, next) => {
    if (!req?.authUser) {
      return res.status(500).json({ message: 'Token not verified' })
    }
    const userRole = req.authUser.role
    const roles = args
    if (!roles.includes(userRole)) {
      return res
        .status(401)
        .json({ message: `Unauthorized. Next roles are allowed: ${roles}` })
    }
    next()
  }
}

module.exports = { validateFields, isAdminRole, allowRoles, validateFile }
