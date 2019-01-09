const db = require('../dbConfig')

async function getUsers() {
  return await db('users')
}

async function insert(user) {
  return await db('users').insert(user)
}

module.exports = {
  getUsers,
  insert
}
