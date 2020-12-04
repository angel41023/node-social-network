const express = require('express')

// const secure = require('./secure')
const response = require('../../../network/response')
const Controller = require('./index')

const router = express.Router()

router.get('/', (req, res, next) => {
  Controller.list()
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Controller.get(req.params.id)
    .then(post => {
      response.success(req, res, post, 200)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  Controller.create(req.body.post)
    .then(post => {
      response.success(req, res, post, 200)
    })
    .catch(next)
})

router.patch('/:id', (req, res, next) => {
  Controller.update(req.params.id, req.body.text)
    .then(post => {
      response.success(req, res, post, 201)
    })
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Controller.remove(req.params.id)
    .then(post => {
      response.success(req, res, post, 201)
    })
    .catch(next)
})

module.exports = router
