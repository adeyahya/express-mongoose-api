const mongoose = require("mongoose")
const Schema = mongoose.Schema
const PhotoSchema = Schema({
  author: {
    type: Schema.Types.ObjectId, ref: "User"
  },
  height: Number,
  width: Number,
  color: String,
  url: {
    small: String,
    medium: String,
    original: String
  }
})

module.exports = mongoose.model("Photo", PhotoSchema)
