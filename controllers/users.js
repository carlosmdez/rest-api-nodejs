const { User } = require('../models')

const { createHash } = require('../helpers/bcrypt')

const getUsers = async (req, res) => {
  const { limit = 5, skip = 0 } = req.query
  const activeUsers = { status: true }

  const [total, users] = await Promise.all([
    User.count(activeUsers),
    User.find(activeUsers).skip(skip).limit(limit)
  ])

  res.json({ total, users })
}

const addUsers = async (req, res) => {
  const { name, email, pass, role } = req.body
  const user = new User({ name, email, pass, role })
  // Encriptar la contraseña
  user.pass = createHash(pass)
  // Guardar usuario en DB
  await user.save()
  res.status(201).json({ ok: true, user })
}

const updateUsers = async (req, res) => {
  const { id } = req.params
  const { _id, pass, googleAuth, ...data } = req.body
  if (pass) {
    data.pass = createHash(pass)
  }
  const user = await User.findByIdAndUpdate(id, data)
  res.json(user)
}

const deleteUsers = async (req, res) => {
  const { id } = req.params

  // Borrándolo físicamente
  // const user = await User.findByIdAndDelete(id)
  // Cambiando estado sin borrarlo
  const user = await User.findByIdAndUpdate(id, { status: false })
  res.json({ ok: true, user})
}

module.exports = { getUsers, addUsers, updateUsers, deleteUsers }
