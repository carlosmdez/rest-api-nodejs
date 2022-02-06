const { Router } = require('express')
const { getUsers, addUsers, updateUsers, deleteUsers } = require('../controllers/users')

const router = Router()

router.get('/', getUsers)
router.post('/', addUsers)
router.put('/:id', updateUsers)
router.delete('/', deleteUsers)

module.exports = router