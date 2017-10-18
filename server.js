const config = require('./config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./router')
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/idnapi", {useMongoClient: true})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.json({
    message: 'hello world'
  })
})
app.use('/register', router.register)


module.exports = app
