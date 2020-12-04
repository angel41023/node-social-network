const express = require('express')
const bodyParser = require('body-parser')

const config = require('../config.js')
const post = require('./components/post/network')
const errors = require('../network/errors')

const app = express()

//Parser
app.use(bodyParser.json())


//Router
app.use('/api/posts', post)

app.use(errors)

app.listen(config.post.port, () => {
  console.log(`Servicio Posts escuchando en el puerto ${config.post.port}`)
})
