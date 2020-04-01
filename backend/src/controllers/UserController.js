const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth.json')

const User = require('../models/User')

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  })
}

module.exports = {
  async authenticate(req, res) {
    const { username, password } = req.body

    const user = await User.findOne({ where: { username: username } })

    if (!user)
      return res.status(400).send({ error: 'User not found' })

    if (!await bcrypt.compare(password, user.password))
      return res.status(400).send({ error: 'Invalid password' })

    user.password = undefined

    return res.send({
      user,
      token: generateToken({ id: user.id })
    })

  },

  async register(req, res) {
    const { email, name, username, password } = req.body

    try {
      if (await User.findOne({ where: { username: username } })) {
        return res.status(400).send({ error: 'Username already exists' })
      }

      if (await User.findOne({ where: { email: email } })) {
        return res.status(400).send({ error: 'Email already exists' })
      }

      const user = await User.create({ email, name, username, password })

      user.password = undefined

      return res.send({
        user,
        token: generateToken({ id: user.id })
      })
    } catch (err) {
      return res.status(400).send({ error: 'Registration Failed' })
    }
  }
}