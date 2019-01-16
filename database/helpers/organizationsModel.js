const db = require('../dbConfig')
const uuid = require('uuid/v4')

// if no param all users
const getOrgs = orgId => {
  if (orgId) {
    return db('organizations as o')
      .where({ 'o.id': orgId })
      .first()
  } else {
    return db('organizations')
  }
}

// gets org by id
const getOrg = id => db('organizations').where('id', id)

const addOrg = org => {
  const id = uuid()
  return db('organizations')
    .insert({ id, ...org })
    .then(() => id)
}

const updateOrg = (orgId, updates) => {
  return db('organizations as o')
    .where({ 'o.id': orgId })
    .update(updates)
}

const deleteOrg = orgId => {
  if (orgId === undefined) {
    return Promise.reject('deleteOrg requires an argument')
  }
  return db('organizations as o')
    .where({ 'o.id': orgId })
    .del()
}

module.exports = {
  getOrgs,
  getOrg,
  addOrg,
  updateOrg,
  deleteOrg
}
