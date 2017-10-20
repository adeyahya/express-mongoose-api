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

// register routes
app.get('/', (req, res) => res.send('hello'))
app.use('/register', router.register)
app.use('/auth', router.auth)
app.use('/api/article', router.article)
app.use('/api/users', router.user)

module.exports = app
