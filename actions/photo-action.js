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

exports.create = function(obj) {
  return new Promise((resolve, reject) => {
    let photo = new Photo()
    Object.assign(photo, obj)

    photo.save((err, photo) => {
      if (err) reject(err)

      resolve(photo)
    })
  })
}
