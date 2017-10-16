const config = require('./config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.json({
    message: 'hello world'
  })
})

module.exports = app
