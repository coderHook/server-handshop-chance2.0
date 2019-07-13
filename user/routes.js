const Router = require('express')
// const User = require('./model')
const userController = require('./../controllers/user.controller')

const router = new Router()

/**
* Create new user by posting to /login 
*/
router.post('/login', userController.loginOrRegister)

module.exports = router