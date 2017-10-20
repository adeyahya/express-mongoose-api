const User = require('./User')
const Article = require('./Article')
const bcrypt = require('bcrypt')
const saltRounds = 10;

module.exports = {
  // create user
  createUser: async (obj) => {
    // Hashing password
    const data = Object.assign({}, obj, {
      password: await bcrypt.hash(obj.password, saltRounds)
    })

    return new Promise((resolve, reject) => {
      const user = new User()
      user.name = data.name
      user.username = data.username
      user.email = data.email
      user.password = data.password
      user.save(err => err ? reject(err) : resolve(user))
    })
  },
  // find user
  findUsers: () => {
    return new Promise((resolve, reject) => {
      User.find()
      .select("-password")
      .exec((err, users) => {
        if (err) reject(err)

        resolve(users)
      })
    })
  },
  findUser: (obj) => {
    return new Promise((resolve, reject) => {
      User.findOne(obj, (err, user) => {
        if (err) reject(err)

        resolve(user)
      })
    })
  },
  findUserById: (id) => {
    return new Promise((resolve, reject) => {
      User.findById(id, (err, user) => {
        if (err) reject(err)

        resolve(user)
      })
    })
  },
  // delete user
  destroyUser: (obj) => {
    return new Promise((resolve, reject) => {
      User.remove(obj, (err, user) => {
        if (err) reject(err)

        resolve(user)
      })
    })
  },
  destroyUserById: (id) => {
    return new Promise((resolve, reject) => {
      User.remove({ _id: id }, (err, user) => {
        if (err) reject(err)

        resolve(user)
      })
    })
  },
  // update user
  updateUser: (obj, objToChange) => {
    return new Promise((resolve, reject) => {
      User.findOne(obj, (err, user) => {
        if (err) reject(err)

        const updatedUser = Object.assign(user, objToChange)
        updatedUser.save((err) => {
          if (err) reject(err)

          resolve(updatedUser)
        })
      })
    })
  },


  // articles
  createArticle: (payload) => {
    return new Promise((resolve, reject) => {
      const article = new Article()

      article.title = payload.title
      article.author = payload.author
      article.slug = payload.slug
      article.data = payload.data

      article.save(err => err ? reject(err) : resolve(article))
    })
  },

  destroyArticle: (payload) => {
    return new Promise((resolve, reject) => {
      Article.remove(payload, (err, article) => {
        if (err) reject(err)

        resolve(article)
      })
    })
  },

  showArticle: (payload) => {
    return new Promise((resolve, reject) => {
      Article.findOne(payload)
        .populate({ path:'author', select: '-password' })
        .exec((err, article) => {
        if (err) reject(err)

        resolve(article)
      })
    })
  },

  updateArticle: (obj, objToChange) => {
    return new Promise((resolve, reject) => {
      Article.findOne(obj, (err, article) => {
        if (err) reject(err)

        const updatedArticle = Object.assign(article, objToChange)
        updatedArticle.save(err => err ? reject(err) : resolve(updatedArticle))
      })
    })
  }
}
