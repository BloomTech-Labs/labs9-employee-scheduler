const db = require('../dbConfig')
const uuid = require('uuid')

// if no param all users
const getOrgs = orgId => {
  if (orgId) {
    return db('organizations as o').where({ 'o.id': orgId })
  } else {
    return db('organizations')
  }
}

const addOrg = org => {
  return db('organizations').insert({ id: uuid(), ...org })
}

const updateOrg = (orgId, updates) => {
  return db('organizations as o')
    .where({ 'o.id': orgId })
    .update(updates)
}

const deleteOrg = orgId => {
  return db('organizations as o')
    .where({ 'o.id': orgId })
    .del()
}

module.exports = {
  getOrgs,
  addOrg,
  updateOrg,
  deleteOrg
}
