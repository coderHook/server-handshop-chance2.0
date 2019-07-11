const Sequelize = require('sequelize')
const db = require('../db')
const Advertisement = require('../advertisement/model')

const User = db.define(
  'user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }
)

// User.hasMany(Advertisement)

module.exports = User