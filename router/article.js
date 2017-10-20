const express = require('express')
const router = express.Router()
const { authMiddleware } = require('./middleware')
const { actions } = require('../models')

router.post('/', authMiddleware, async (req, res) => {
  const slug = req.body.title === undefined
    ? (new Date().getTime())
    : req.body.title.replace(/\s+/g, '-') + "-" + (new Date().getTime())
  try {
    const user = await actions.findUserById(req.decoded._id)

    const article = await actions.createArticle({
      title: req.body.title === undefined
        ? ""
        : req.body.title,
      author: user._id,
      slug: slug,
      data: req.body.data
    })

    res.json(article)
  } catch(e) {
    res.status(401).json({
      message: e
    })
  }
})

router.get('/:slug', async (req, res) => {
  try {
    const article = await actions.showArticle({slug: req.params.slug})

    if (!article) {
      return res.status(404).json({
        message: 'article not found'
      })
    }

    return res.json(article)
  } catch(e) {
    res.status(401).json({message: e})
  }
})

router.patch('/:slug', authMiddleware, async (req, res) => {
  try {
    const article = await actions.showArticle({slug: req.params.slug})

    if (!article) {
      return res.status(404).json({
        message: 'article not found'
      })
    }

    if (article.author.username != req.decoded.username) {
      return res.status(401).json({
        message: "this article not belongs to you"
      })
    }

    const updatedArticle = await actions.updateArticle({_id: article._id}, req.body)
    return res.json(updatedArticle)

  } catch(e) {
    return res.status(401).json({message: e})
  }
})

router.delete('/:slug', authMiddleware, async (req, res) => {
  try {
    const article = await actions.showArticle({slug: req.params.slug})

    if (!article) {
      return res.status(404).json({
        message: 'article not found'
      })
    }

    if (article.author.username != req.decoded.username) {
      return res.status(401).json({
        message: "this article not belongs to you"
      })
    }

    await actions.destroyArticle({_id: article._id})
    return res.json({
      message: 'success deleted article'
    })

  } catch(e) {
    return res.status(401).json({message: e})
  }
})

module.exports = router
