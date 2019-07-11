const Router = require('express')
const User = require('./model')

const router = new Router()

/**
* Create new user by posting to /login 
*/
router.post('/login', (req, res, next) => {
  const {name, password} = req.body
  if(name && password) {
    User
      .findOne({where: {name}})
      .then(user => {
        if(!user){
          User
            .create({name, password})
            .then(user => res.status(200).send(user))
            .catch(next)
        } else {
          res.send()
        }
      })
      .catch(next) 
  } else {
    res.send({message: 'Please set a User and Password'})
  }
})

module.exports = router