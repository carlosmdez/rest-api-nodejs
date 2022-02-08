const createHash = require('../helpers/bcrypt')
const User = require('../models/user')

const getUsers = (req, res) => {
  const query = req.query

  res.json({ ok: true, info: query })
}

const addUsers = async (req, res) => {
  const { name, email, pass, role } = req.body
  const user = new User({ name, email, pass, role })
  // Encriptar la contraseña
  user.pass = createHash(pass)
  // Guardar usuario en DB
  await user.save()
  res.json({ ok: true, user })
}

const updateUsers = async (req, res) => {
  const id = req.params.id
  const { _id, pass, google, ...data } = req.body
  if (pass) {
    data.pass = createHash(pass)
  }
  const user = await User.findByIdAndUpdate(id, data)
  res.json({ ok: true, user })
}

const deleteUsers = (req, res) => {
  res.json({ ok: true, user: 'User deleted' })
}

module.exports = { getUsers, addUsers, updateUsers, deleteUsers }
