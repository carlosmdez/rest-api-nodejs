const { Router } = require('express')
const { check } = require('express-validator')
const {
  getUsers,
  addUsers,
  updateUsers,
  deleteUsers
} = require('../controllers/users')
const { validateFields } = require('../middlewares/validation')

const router = Router()

router.get('/', getUsers)
router.post(
  '/',
  [
    check('name', 'Name field is mandatory').not().isEmpty(),
    check('pass', 'Password shoud have at least 6 characters').isLength({
      min: 6
    }),
    check('email', 'Not a valid email').isEmail(),
    check('role', 'Not a valid role').isIn(['ADMIN', 'USER']),
    validateFields
  ],
  addUsers
)
router.put('/:id', updateUsers)
router.delete('/', deleteUsers)

module.exports = router
