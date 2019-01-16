const knex = require('knex')
const knexConfig = require('../knexfile.js')

const { DB_ENV } = process.env
const env = DB_ENV === 'psql' ? 'dev_psql' : 'development'
module.exports = knex(knexConfig[env])
