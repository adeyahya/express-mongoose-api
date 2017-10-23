function ArticleAction() {
  this.Article = require('../models/Article')
}

ArticleAction.prototype = {
  get: function() {
    return new Promise((resolve, reject) => {
      this.Article.find()
        .populate("author", "_id username name avatar")
        .exec((err, articles) => {
          if (err) reject(err)

          resolve(articles)
        })
    })
  },

  find: function(obj) {
    return new Promise((resolve, reject) => {
      this.Article.findOne(obj)
        .populate('author','-password')
        .exec((err, article) => {
          if (err) reject(err)

          resolve(article)
      })
    })
  },

  create: function(payload) {
    return new Promise((resolve, reject) => {
      const article = new this.Article()

      article.title = payload.title
      article.author = payload.author
      article.slug = payload.slug
      article.data = payload.data

      article.save(err => err ? reject(err) : resolve(article))
    })
  },

  destroy: function(obj) {
    return new Promise((resolve, reject) => {
      this.Article.remove(obj, (err, article) => {
        if (err) reject(err)

        resolve(article)
      })
    })
  },

  update: function(obj, objToChange) {
    return new Promise((resolve, reject) => {
      this.Article.findOne(obj, (err, article) => {
        if (err) reject(err)

        const updatedArticle = Object.assign(article, objToChange)
        updatedArticle.save(err => err ? reject(err) : resolve(updatedArticle))
      })
    })
  }
}

module.exports = new ArticleAction();
