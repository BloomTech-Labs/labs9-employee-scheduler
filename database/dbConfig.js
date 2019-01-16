const knex = require('knex')
const knexConfig = require('../knexfile.js')

module.exports = knex(knexConfig.dev_psql)
