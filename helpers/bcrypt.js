const bcrypt = require('bcryptjs')

const createHash = data => {
  const salt = bcrypt.genSaltSync()
  return bcrypt.hashSync(data, salt)
}

const validatePassword = (input, userPass) => {
  return bcrypt.compareSync(input, userPass)
}

module.exports = { createHash, validatePassword }
