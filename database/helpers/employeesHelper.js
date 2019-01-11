const db = require('../dbConfig')
const uuid = require('uuid')

// if no param all users
const getEmployees = orgId => {
  if (orgId) {
    return db('users as u').where({ 'u.organization_id': orgId })
  } else {
    return db('users')
  }
}
// get a single user
const getEmployee = id => {
  return db('users')
    .where({ id })
    .first()
}

const addEmployee = user => {
  return db('users').insert({ id: uuid(), ...user })
}

const updateEmployee = (userId, updates) => {
  return db('users as u')
    .where({ 'u.id': userId })
    .update(updates)
}

const deleteEmployee = userId => {
  return db('users as u')
    .where({ 'u.id': userId })
    .del()
}

module.exports = {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee
}
