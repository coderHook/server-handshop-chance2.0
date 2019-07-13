const Router = require('express')
const Advertisement = require('./model')
const auth = require('./../middlewares/auth.middleware.js')

const router = new Router()

router.get('/advertisements', (req, res, next) => {

  Advertisement
    .findAll()
    .then(advertisement => res.status(200).send(advertisement))
    .catch(err => next(err))
})

router.post('/advertisements', auth, (req, res,next) => {
  const { id } = req.user.dataValues

  Advertisement
    .create({...req.body, userId: id})
    .then(newAd => {
      res.status(200).send(newAd)
    })
    .catch(err => next(err))
})

router.get('/advertisements/:id', (req, res, next) => {
  const id = req.params.id;
  Advertisement
    .findByPk(id)
    .then(adv => res.status(200).send(adv))
    .catch(err => next(err))
})

router.put('/advertisements/:id', (req, res, next) => {
  const id = req.params.id
  const editAd = req.body

  Advertisement
    .findByPk(id)
    .then(ad => {
      ad.update(editAd)
        .then(updated => res
          .status(200)
          .send({
            message: "Update OK", 
            updated
          }))
    })
    .catch(next)
})

router.delete('/advertisements/:id', (req, res, next) => {
  const id = req.params.id

  Advertisement
    .destroy({ where: {id}})
    .then(adDeleted => res.status(200).send(`Deleted ad ${id}`))
    .catch(err => next(err))
})

module.exports = router