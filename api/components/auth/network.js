const express = require('express')

const response = require('../../../network/response')
const Controller = require('./index')

const router = express.Router()

router.post('/login', (req, res) => {
  const {username, password} = req.body
  Controller.login(username, password)
    .then((token) => {
      response.success(req, res, token, 200)
    })
    .catch((err) => {
      console.log(err)
      response.error(req, res, err, 400)
    })
})

module.exports = router