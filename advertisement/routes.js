const Router = require('express')
const Advertisement = require('./model')

const router = new Router()

router.get('/advertisements', (req, res, next) => {
  Advertisement
    .findAll()
    .then(advertisement => res.status(200).send(advertisement))
    .catch(err => next(err))
})

router.post('/advertisements', (req, res,next) => {
  
  Advertisement
    .create(req.body)
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

  console.log("console.log", editAd)

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

  console.log(id)

  Advertisement
    .destroy({ where: {id}})
    .then(adDeleted => res.status(200).send(`Deleted ad ${id}`))
    .catch(err => next(err))
})


module.exports = router