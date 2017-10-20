const express = require('express')
const router = express.Router()
const { actions } = require('../models')

router.get('/', async (req, res) => {
  try {
    const users = await actions.findUsers()
    res.json(users)
  } catch(e) {
    res.status(401)
      .json({
        message: e
      })
  }
})

router.get('/:username', async (req, res) => {
  try {
    const user = await actions.findUser({username: req.params.username})
    res.json(user)
  } catch (e) {
    res.status(401)
      .json({
        message: e
      })
  }
})


module.exports = router
