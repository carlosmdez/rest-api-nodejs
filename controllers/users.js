const User = require('../models/user')
const bcrypt = require('bcryptjs')

const getUsers = (req, res) => {
  const query = req.query

  res.json({ ok: true, info: query })
}

const addUsers = async (req, res) => {
  const { name, email, pass, role } = req.body
  const user = new User({ name, email, pass, role })
  // Encriptar la contraseña
  const salt = bcrypt.genSaltSync()
  user.pass = bcrypt.hashSync(pass, salt)
  // Guardar usuario en DB
  await user.save()
  res.json({ ok: true, user })
}

const updateUsers = (req, res) => {
  const id = req.params.id
  res.json({ ok: true, user: `User ${id} updated` })
}

const deleteUsers = (req, res) => {
  res.json({ ok: true, user: 'User deleted' })
}

module.exports = { getUsers, addUsers, updateUsers, deleteUsers }
