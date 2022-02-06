const getUsers = (req, res) => {
  res.json({ ok: true, user: 'Juanito' })
}

const addUsers = (req, res) => {
  res.json({ ok: true, user: 'User added' })
}

const updateUsers = (req, res) => {
  res.json({ ok: true, user: 'User updated' })
}

const deleteUsers = (req, res) => {
  res.json({ ok: true, user: 'User deleted' })
}

module.exports = { getUsers, addUsers, updateUsers, deleteUsers }
