const { check, validationResult } = require('express-validator/check')
const express = require('express')
const router = express.Router()
const { actions, User } = require('../models')

const validator = [
  check('email', 'Must be an email')
    .isEmail()
    .trim()
    .normalizeEmail()
    .custom(value => {
      return actions.findUser({email: value}).then(user => {
        if (user)
          throw new Error("this email is already in used")

        return value
      })
    }),
  check('username')
    .custom(value => {
      if (typeof value.match(/\s+/) === null)
        throw new Error("Username can't have space")

      return value
    })
    .custom(value => {
      return actions.findUser({username: value}).then(user => {
        if (user)
          throw new Error('this username is already taken')

        return value
      })
    }),
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
    const response = await actions.createUser(req.body)
    return res.json(response)
  } catch(err) {
    throw new Error(err)
  }
})

module.exports = router
