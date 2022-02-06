const getUsers = (req, res) => {
  res.json({ ok: true, user: 'Juanito' })
}

const addUsers = (req, res) => {
  const body = req.body
  res.json({ ok: true, user: body })
}

const updateUsers = (req, res) => {
  res.json({ ok: true, user: 'User updated' })
}

const deleteUsers = (req, res) => {
  res.json({ ok: true, user: 'User deleted' })
}

module.exports = { getUsers, addUsers, updateUsers, deleteUsers }
