const { User } = require('../models')

const { validatePassword } = require('../helpers/bcrypt')
const { generateJWT } = require('../helpers/jwt')
const { googleVerify } = require('../helpers/google-auth')

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

const googleSignIn = async (req, res) => {
  const { id_token } = req.body
  try {
    const { name, picture, email } = await googleVerify(id_token)
    let user = await User.findOne({ email })
    if (!user) {
      const data = {
        name,
        email,
        pass: '1234',
        img: picture,
        googleAuth: true,
      }
      user = new User(data)
      await user.save()
    } else if (!user.status) {
      return res.status(401).json({ ok: false, message: 'Contact support' })
    }
    const token = await generateJWT(user.id)
    res.json({ ok: true, user, token })
  } catch (error) {
    console.log(error)
    res.status(400).json({ ok: false, message: 'Cannot verify Google Token' })
  }
}

module.exports = { login, googleSignIn }
