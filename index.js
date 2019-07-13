const express = require('express')
const cors = require('cors')
const db = require('./db')
const bodyParser = require('body-parser')

const Advertisement = require('./advertisement/model')
const advertisementRoutes = require('./advertisement/routes')

const User = require('./user/model')
const userRoutes = require('./user/routes')

const app = express()
const jsonParser = bodyParser.json()

app.use(cors())
app.use(jsonParser)
app.use(advertisementRoutes)
app.use(userRoutes)
app.use(function(err, req, res, next) {
  if(401 == err.status) {
      res.redirect('/home')
  }
});

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}`))