const express = require('express')
const router = express.Router()
const userAction = require("../actions/user-action")

router.get('/', async (req, res) => {
  try {
    const users = await userAction.get()
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
    const user = await userAction.find({username: req.params.username})
    res.json(user)
  } catch (e) {
    res.status(401)
      .json({
        message: e
      })
  }
})


module.exports = router
