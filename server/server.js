const express = require('express')
const configureMiddleware = require('./config/middleware.js')

const server = express()

configureMiddleware(server)

const faker = require('faker')
const ids = require('../database/ids.json').org_ids

const organizations = ids.map(id => ({
  id,
  name: faker.company.companyName(),
  description: faker.lorem.sentence()
}))
console.log(organizations)

server.get('/', (req, res) => res.status(200).json({ message: 'hello!' }))

module.exports = server
