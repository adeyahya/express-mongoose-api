const User = require("../models/User")
const bcrypt = require("bcryptjs")
const saltRounds = Number(process.env.SALT_ROUNDS)

exports.create = async function(obj) {
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
}

exports.get = function() {
  return new Promise((resolve, reject) => {
    User.find()
      .select("-password")
      .exec((err, users) => {
        if (err) reject(err)

        resolve(users)
    })
  })
}

exports.find = function(obj) {
  return new Promise((resolve, reject) => {
    User.findOne(obj, (err, user) => {
      if (err) reject(err)

      resolve(user)
    })
  })
}

exports.destroy = function(obj) {
  return new Promise((resolve, reject) => {
    User.remove(obj, (err, user) => {
      if (err) reject(err)

      resolve(user)
    })
  })
}

exports.update = function(obj, objToChange) {
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
}
