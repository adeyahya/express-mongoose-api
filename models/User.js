const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String, default: "http://via.placeholder.com/150x150" }
})

module.exports = mongoose.model('User', userSchema)
