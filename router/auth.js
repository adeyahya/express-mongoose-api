const express = require('express')
const router = express.Router()
const { actions, User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const privateKey = 'secret'

router.post('/', async (req, res) => {
  try {
    const user = await actions.findUser({ email: req.body.email })
    if (user.length === 0)
      return res.status(401).json({ message: `User with email ${req.body.email} not found!` })

    const passwordMatch = await bcrypt.compare(req.body.password, user[0].password)
    if (!passwordMatch)
      return res.status(401).json({ message: "Wrong password!" })

    const tokenData = {
      username: user.username,
      email: user.email,
      _id: user._id
    }

    res.json({
      username: user.username,
      email: user.email,
      token: jwt.sign(tokenData, privateKey, { expiresIn: '168h' })
    })
  } catch (e) {
    throw new Error(e)
  }
})

module.exports = router
