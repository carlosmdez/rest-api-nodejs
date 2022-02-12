const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const { validateFields } = require('../middlewares/validation')
const { login, googleSignIn } = require('../controllers/auth')

router.post(
  '/login',
  [
    check('email', 'Not a valid email').isEmail(),
    check('pass', 'Password is required').not().isEmpty(),
    validateFields
  ],
  login
)

router.post(
  '/google',
  [
    check('id_token', 'Google Token is required').not().isEmpty(),
    validateFields
  ],
  googleSignIn
)

module.exports = router
