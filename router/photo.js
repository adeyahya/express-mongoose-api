const express = require("express")
const router = express.Router()
const path = require("path")
const photoAction = require("../actions/photo-action")
const { authMiddleware } = require("./middleware")

const multer  = require('multer')
const Vibrant = require('node-vibrant');
const Jimp = require("jimp");

// setup storage
const DB_NAME = 'db.json',
  COLLECTION_NAME = 'images',
  UPLOAD_PATH = path.join(process.cwd(), 'uploads'),
  storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, `${UPLOAD_PATH}/`)
    },
    filename: function(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  }),
  upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const data = await photoAction.get()
    return res.json(data)
  } catch(e) {
    return res.status(500)
      .json(e)
  }
})

router.get("/:photoid", async (req, res) => {
  try {
    const photo = await photoAction.find({_id: req.params.photoid})
    return res.json(photo)
  } catch(e) {
    return res.status(500).json(e)
  }
})

router.post("/", authMiddleware, upload.single('photo'), (req, res) => {
  // @TODO: covert rgb to hex in color
  // add authentication
  // add middleware for size limit

  Jimp.read(req.file.path, function(err, jimp) {
    if (err)
      return res.status(500)
        .json(err)

    jimp.resize(1200, Jimp.AUTO)
      .quality(90)
      .write(path.join(process.cwd(), `uploads/regular/${req.file.filename}`))

    jimp.resize(300, Jimp.AUTO)
      .write(path.join(process.cwd(), `uploads/small/${req.file.filename}`))

    Vibrant.from(req.file.path).getPalette( async function(err, palette) {
      if (err)
        return res.status(500)
          .json(err)

      const vibrant = palette.Vibrant._rgb

      let photo = {
        originalname: req.file.originalname,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        filename: req.file.filename,
        size: req.file.size,
        author: req.decoded._id,
        color: `rgb(${vibrant[0]},${vibrant[1]},${vibrant[2]})`,
        url: {
          small: `/uploads/small/${req.file.filename}`,
          regular: `/uploads/regular/${req.file.filename}`,
          original: `/uploads/${req.file.filename}`
        },
        width: jimp.bitmap.width,
        height: jimp.bitmap.height
      }

      try {
        const data = await photoAction.create(photo)
        return res.json(data)
      } catch(e) {
        return res.status(500)
          .json(e)
      }
    })
  })
})

module.exports = router
