const knex = require('knex')
const knexConfig = require('../knexfile.js')

const { DB_ENV } = process.env
const env = DB_ENV === 'sqlite3' ? 'development' : 'dev_psql'
module.exports = knex(knexConfig[env])
