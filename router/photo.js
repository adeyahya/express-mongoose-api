const express = require("express")
const router = express.Router()
const photoAction = require("../actions/photo-action")

router.get("/", async (req, res) => {
  try {
    const data = await photoAction.get()
    res.json(data)
  } catch(e) {
    res.status(500)
      .json(e)
  }
})

module.exports = router
