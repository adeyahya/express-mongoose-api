const express = require('express')
const router = express.Router()
const { authMiddleware } = require('./middleware')
const { actions } = require('../models')

router.post('/', authMiddleware, async (req, res) => {
  const slug = req.body.title === undefined ? (new Date().getTime()) : req.body.title.replace(/\s+/g, '-')
  try {
    const user = await actions.findUserById(req.decoded._id)

    const article = await actions.createArticle({
      title: req.body.title === undefined ? "" : req.body.title,
      author: user._id,
      slug: slug,
      data: req.body.data
    })

    res.json(article)
  } catch(e) {
    res.status(500).json({
      message: e
    })
  }
})

module.exports = router
