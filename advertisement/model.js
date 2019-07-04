const Sequelize = require('sequelize')
const db = require('../db')

const Advertisement = db.define(
  'advertisement',
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    picture: {
      type: Sequelize.STRING,
      allowNull: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      },
      allowNull: true
    },
    phone: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  }, {
    timeStamps: true,
    tableName: 'Advertisements'
  }
)

module.exports = Advertisement