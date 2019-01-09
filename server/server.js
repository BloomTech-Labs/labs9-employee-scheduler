const express = require('express')
const configureMiddleware = require('./config/middleware.js')

const server = express()
const router = require('./routers/router')

configureMiddleware(server)

server.get('/', (req, res) => res.status(200).json({ message: 'hello!' }))

server.use('/users', router)

module.exports = server
