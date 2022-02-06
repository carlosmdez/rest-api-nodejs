const getUsers = (req, res) => {
  const query = req.query

  res.json({ ok: true, info: query })
}

const addUsers = (req, res) => {
  const body = req.body
  res.json({ ok: true, user: body })
}

const updateUsers = (req, res) => {
  const id = req.params.id
  res.json({ ok: true, user: `User ${id} updated` })
}

const deleteUsers = (req, res) => {
  res.json({ ok: true, user: 'User deleted' })
}

module.exports = { getUsers, addUsers, updateUsers, deleteUsers }
