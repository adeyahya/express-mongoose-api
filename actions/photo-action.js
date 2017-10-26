const Photo = require("../models/Photo")

exports.get = function() {
  return new Promise((resolve, reject) => {
    Photo.find()
      .populate("author", "-password")
      .exec((err, photos) => {
        if (err) reject(err)

        resolve(photos)
      })
  })
}
