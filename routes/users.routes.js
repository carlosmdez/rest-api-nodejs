const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const { validateFields } = require('../middlewares/validation')
const { roleValidator, emailValidator } = require('../helpers/validators')

const {
  getUsers,
  addUsers,
  updateUsers,
  deleteUsers
} = require('../controllers/users')

router.get('/', getUsers)
router.post(
  '/',
  [
    check('name', 'Name field is mandatory').not().isEmpty(),
    check('pass', 'Password shoud have at least 6 characters').isLength({
      min: 6
    }),
    check('email', 'Not a valid email').isEmail(),
    check('email').custom(emailValidator),
    check('role').custom(roleValidator),
    validateFields
  ],
  addUsers
)
router.put('/:id', updateUsers)
router.delete('/', deleteUsers)

module.exports = router
