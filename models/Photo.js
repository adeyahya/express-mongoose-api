const mongoose = require("mongoose")
const Schema = mongoose.Schema
const PhotoSchema = Schema({
  originalname: String,
  encoding: String,
  mimetype: String,
  filename: String,
  size: Number,
  author: {
    type: Schema.Types.ObjectId, ref: "User"
  },
  height: Number,
  width: Number,
  color: String,
  url: {
    small: String,
    regular: String,
    original: String
  }
})

module.exports = mongoose.model("Photo", PhotoSchema)
