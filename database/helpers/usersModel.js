const db = require('../dbConfig')
const uuid = require('uuid')

// if no param all users
const getUsers = orgId => {
  if (orgId) {
    return db('users as u').where({ 'u.organization_id': orgId })
  } else {
    return db('users')
  }
}

const addUser = (orgId, user) => {
  return db('users').insert({ id: uuid(), ...user })
}

const updateUser = (userId, updates) => {
  return db('users as u')
    .where({ 'u.id': userId })
    .update(updates)
}

const deleteUser = userId => {
  return db('users as u')
    .where({ 'u.id': userId })
    .del()
}

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser
}
