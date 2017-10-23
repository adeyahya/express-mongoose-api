function UserAction(){
  this.User = require('../models/User')
  this.bcrypt = require('bcryptjs')
  this.saltRounds = 10
}
UserAction.prototype = {
  create: async function(obj) {
    // Hashing password
    const data = Object.assign({}, obj, {
      password: await this.bcrypt.hash(obj.password, this.saltRounds)
    })

    return new Promise((resolve, reject) => {
      const user = new this.User()
      user.name = data.name
      user.username = data.username
      user.email = data.email
      user.password = data.password
      user.save(err => err ? reject(err) : resolve(user))
    })
  },

  // find user
  get: function() {
    return new Promise((resolve, reject) => {
      this.User.find()
        .select("-password")
        .exec((err, users) => {
          if (err) reject(err)

          resolve(users)
      })
    })
  },

  find: function(obj) {
    return new Promise((resolve, reject) => {
      this.User.findOne(obj, (err, user) => {
        if (err) reject(err)

        resolve(user)
      })
    })
  },
  // delete user
  destroy: function(obj) {
    return new Promise((resolve, reject) => {
      this.User.remove(obj, (err, user) => {
        if (err) reject(err)

        resolve(user)
      })
    })
  },
  // update user
  update: function(obj, objToChange) {
    return new Promise((resolve, reject) => {
      this.User.findOne(obj, (err, user) => {
        if (err) reject(err)

        const updatedUser = Object.assign(user, objToChange)
        updatedUser.save((err) => {
          if (err) reject(err)

          resolve(updatedUser)
        })
      })
    })
  },
}

module.exports = new UserAction();
