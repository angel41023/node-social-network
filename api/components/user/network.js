const express = require('express')

const secure = require('./secure')
const response = require('../../../network/response')
const Controller = require('./index')

const router = express.Router()

router.get('/', (req, res, next) => {
  Controller.list()
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  Controller.create(req.body.user)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch(next)
})

router.patch('/:id', secure('update'), (req, res, next) => {
  Controller.update(req.params.id, req.body.name)
    .then((user) => {
      response.success(req, res, user, 201)
    })
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Controller.remove(req.params.id)
    .then((user) => {
      response.success(req, res, user, 201)
    })
    .catch(next)
})

router.post('/follow/:id', secure('follow'), (req, res, next) => {
  Controller.follow(req.user.id, req.params.id)
    .then(data => {
      response.success(req, res, data, 201)
    })
    .catch(next)
})

router.get('/:id/following', (req, res, next) => {
  Controller.following(req.params.id)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(next)
})

module.exports = router
