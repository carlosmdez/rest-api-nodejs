const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const { validateFields } = require('../middlewares/validation')
const { login } = require('../controllers/auth')

router.post(
  '/login',
  [
    check('email', 'Not a valid email').isEmail(),
    check('pass', 'Password is required').not().isEmpty(),
    validateFields
  ],
  login
)

module.exports = router
