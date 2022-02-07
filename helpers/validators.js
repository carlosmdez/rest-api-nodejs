const User = require('../models/user')
const Role = require('../models/role')

const roleValidator = async (role = '') => {
  const validRole = await Role.findOne({ role })
  if (!validRole) {
    throw new Error(`El rol ${role} no es válido`)
  }
}

const emailValidator = async (email = '') => {
  const emailExist = await User.findOne({ email })
  if (emailExist) {
    throw new Error(`Email ${email} already exist`)
  }
}

module.exports = { roleValidator, emailValidator }
