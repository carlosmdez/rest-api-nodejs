const { User, Role, Category } = require('../models')

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

const userValidator = async id => {
  try {
    const user = await User.findById(id)
    if (!user) {
      throw new Error(`User with ID: ${id} not found`)
    }
  } catch (error) {
    throw new Error(`User with ID: ${id} not found`)
  }
}

const categoryValidator = async id => {
  try {
    const category = await Category.findById(id)
    if (!category) {
      throw new Error(`Category with ID: ${id} not found`)
    }
  } catch (error) {
    throw new Error(`Category with ID: ${id} not found`)
  }
}

module.exports = {
  roleValidator,
  emailValidator,
  userValidator,
  categoryValidator,
}
