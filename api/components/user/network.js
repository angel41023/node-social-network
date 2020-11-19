const express = require('express')

const secure = require('./secure')
const response = require('../../../network/response')
const Controller = require('./index')

const router = express.Router()

router.get('/', (req, res) => {
  Controller.list()
    .then((data) => {
      response.success(req, res, data, 200)
    })
    .catch(err => {
      response.error(req, res, err.message, 500)
    })
})

router.get('/:id', (req, res) => {
  Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch((err) => {
      response.error(req, res, err.message, 500)
    })
})

router.post('/', (req, res) => {
  Controller.create(req.body.user)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch((err) => {
      response.error(req, res, err.message, 500)
    })
})

router.patch('/:id', secure('update'), (req, res) => {
  Controller.update(req.params.id, req.body.name)
    .then((user) => {
      response.success(req, res, user, 201)
    })
    .catch((err) => {
      response.error(req, res, err.message, 500)
    })
})

router.delete('/:id', (req, res) => {
  Controller.remove(req.params.id)
    .then((user) => {
      response.success(req, res, user, 201)
    })
    .catch((err) => {
      response.error(req, res, err.message, 500)
    })
})

module.exports = router