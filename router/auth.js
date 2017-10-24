const { check, validationResult } = require('express-validator/check')
const express = require('express')
const router = express.Router()
const userAction = require('../actions/user-action')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const privateKey = 'secret'

const validator = [
  check('email', 'Must be an email')
    .isEmail()
    .trim()
    .normalizeEmail(),
  check('password', 'passwords must be at least 5 chars long and contain one number')
    .isLength({ min: 5 })
    .matches(/\d/)
]

router.post('/', validator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  try {
    const user = await userAction.find({ email: req.body.email })
    if (!user)
      return res.status(401).json({ message: `User with email ${req.body.email} not found!` })

    const passwordMatch = await bcrypt.compare(req.body.password, user.password)
    if (!passwordMatch)
      return res.status(401).json({ message: "Wrong password!" })

    const tokenData = {
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      name: user.name,
      _id: user._id
    }

    const token = jwt.sign(tokenData, privateKey)

    res.json({
      username: user.username,
      email: user.email,
      token: token
    })
  } catch (e) {
    throw new Error(e)
  }
})

module.exports = router
