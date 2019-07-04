const Sequelize = require('sequelize')

const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5433/ebay-clone'

const sequelize = new Sequelize(databaseUrl)

sequelize
  .sync()
  .then(() => console.log('Database Schema Updated!'))
  .catch(console.error)

module.exports = sequelize