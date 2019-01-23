const knex = require('knex')
const knexConfig = require('../knexfile.js')

console.log(process.env.NODE_ENV)
module.exports = knex(knexConfig[process.env.NODE_ENV])
