const { response } = require('express')
const express = require('express')
const bodyParser = require('body-parser')
const config = require('../config.js')
const user = require('./components/user/network.js')

const app = express()

//Parser
app.use(bodyParser.json())
//Router
app.use('/api/users', user)

app.listen(config.api.port, () => {
  console.log(`Api escuchando en el puerto ${config.api.port}`)
})