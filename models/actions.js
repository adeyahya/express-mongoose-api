const User = require('./User')
module.exports = {
  // create user
  createUser: (obj) => {
    return new Promise((resolve, reject) => {
      const user = new User()
      // const newUser = Object.assign({}, user, obj)
      user.name = obj.name
      user.username = obj.username
      user.email = obj.email
      user.password = obj.password
      user.save(err => err ? reject(err) : resolve(user))
    })
  },
  // find user
  findUser: (obj) => {
    return new Promise((resolve, reject) => {
      User.find(obj, (err, user) => {
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
}
