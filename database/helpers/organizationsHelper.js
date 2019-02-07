const db = require('../dbConfig')
const uuid = require('uuid/v4')
const moment = require('moment')

// creates hours for 7 days for a new org
const insertHoursForNewOrg = (org_id, offset) => {
  let hours = []
  let day = [0, 1, 2, 3, 4, 5, 6]
  for (let i = 0; i < 7; i++) {
    let thisDay = {
      id: uuid(),
      organization_id: org_id,
      day: day[i],
      open_time: moment
        .utc({ hours: 9 })
        .subtract(offset, 'minutes')
        .format('HH:mm'),
      close_time: moment
        .utc({ hours: 17 })
        .subtract(offset, 'minutes')
        .format('HH:mm'),
      closed: false
    }
    hours.push(thisDay)
  }
  return db('hours_of_operation')
    .insert(hours)
    .returning('id')
}

// gets all orgs
const getOrgs = () => db('organizations')

// gets org by id
const getOrg = id =>
  db('organizations')
    .where('id', id)
    .first()

const addOrg = (org, offset) => {
  const id = org.id ? org.id : uuid()
  console.log(offset)
  return db('organizations')
    .insert({ id, ...org })
    .then(res => {
      return insertHoursForNewOrg(id, offset)
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
