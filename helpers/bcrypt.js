const bcrypt = require('bcryptjs')

const createHash = data => {
  const salt = bcrypt.genSaltSync()
  return bcrypt.hashSync(data, salt)
}

module.exports = createHash
