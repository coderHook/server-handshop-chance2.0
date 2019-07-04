const Router = require('express')
const Advertisement = require('./model')

const router = new Router()

router.get('/advertisements', (req, res, next) => {
  Advertisement
    .findAll()
    .then(advertisement => res.status(200).send(advertisement))
    .catch(err => next(err))
})

router.get('/advertisements/:id', (req, res, next) => {
  const id = req.params.id;
  Advertisement
    .findByPk(id)
    .then(adv => res.status(200).send(adv))
    .catch(err => next(err))
})

router.post('/advertisements', (req, res,next) => {

  // const test = {
  //   title: "TEST TEST",
  //   picture: "https://picsum.photos/id/1/200",
  //   description: "amet, consectetur adipiscing elit, ",
  //   price: 0.31642592,
  //   email: "test@test.com",
  //   phone: 26751
  //   }

  console.log('teq.body', req.body)
  Advertisement
    .create(req.body)
    .then(newAd => {
      res.status(200).send(newAd)
    })
    .catch(err => next(err))

})


module.exports = router