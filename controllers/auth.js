const User = require('../models/user')

const { validatePassword } = require('../helpers/bcrypt')
const { generateJWT } = require('../helpers/jwt')

const login = async (req, res) => {
  const { email, pass } = req.body
  try {
    // Verify if the user is in the DB and active
    const user = await User.findOne({ email })
    if (!user?.status) {
      return res
        .status(400)
        .json({ ok: false, message: 'User / Password incorrect' })
    }

    // Verify password
    const isValidPass = validatePassword(pass, user.pass)
    if (!isValidPass) {
      return res
        .status(400)
        .json({ ok: false, message: 'User / Password incorrect' })
    }

    // Generate JWT
    const token = await generateJWT(user.id)

    res.json({ user, token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, message: 'Something went wrong.' })
  }
}

module.exports = { login }
