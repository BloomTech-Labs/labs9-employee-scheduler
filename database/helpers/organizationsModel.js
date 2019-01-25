const db = require('../dbConfig')
const uuid = require('uuid/v4')

// creates hours for 7 days for a new org
const insertHoursForNewOrg = org_id => {
  let hours = []
  let day = [0, 1, 2, 3, 4, 5, 6]
  for (let i = 0; i < 7; i++) {
    let thisDay = {
      id: uuid(),
      organization_id: org_id,
      day: day[i],
      open_time: 9,
      close_time: 17,
      closed: false
    }
    hours.push(thisDay)
  }
  return db('hours_of_operation')
    .insert(hours)
    .returning('id')
}

// if no param all users
const getOrgs = () => db('organizations')

// gets org by id
const getOrg = id => db('organizations').where('id', id)

const addOrg = org => {
  const id = org.id ? org.id : uuid()
  return db('organizations')
    .insert({ id, ...org })
    .then(res => {
      return insertHoursForNewOrg(id)
    })
    .then(res => {
      return id
    })
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
