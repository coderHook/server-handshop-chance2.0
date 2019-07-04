const express = require('express')
const cors = require('cors')
const db = require('./db')
const bodyParser = require('body-parser')

const Advertisement = require('./advertisement/model')
const advertisementRoutes = require('./advertisement/routes')

const app = express()
const jsonParser = bodyParser.json()

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

app.use(cors(allowCrossDomain))
app.use(jsonParser)
app.use(advertisementRoutes)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}`))