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

var corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions))
app.use(jsonParser)
app.use(advertisementRoutes)
app.use(userRoutes)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}`))