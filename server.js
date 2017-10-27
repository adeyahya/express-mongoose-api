require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./router')
mongoose.Promise = global.Promise

const dbUrl = process.env.NODE_ENV === "production"
  ? process.env.DB_HOST
  : "mongodb://localhost/dummy"
mongoose.connect(dbUrl, {useMongoClient: true})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// register routes
app.get('/', (req, res) => res.send('hello'))
app.use('/register', router.register)
app.use('/auth', router.auth)
app.use('/article', router.article)
app.use('/users', router.user)
app.use('/photos', router.photo)

module.exports = app
