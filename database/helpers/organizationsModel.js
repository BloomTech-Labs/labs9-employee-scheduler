const db = require('../dbConfig')
const uuid = require('uuid/v4')

// creates hours for 7 days for a new org
const insertHoursForNewOrg = org_id => {
  let hours = []
  let day = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
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
  console.log(hours)
  return db('hours_of_operation').insert(hours)
}

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
  const id = org.id ? org.id : uuid()
  return db('organizations')
    .insert({ id, ...org })
    .then(res => {
      console.log(id)
      return insertHoursForNewOrg(id)
    })
    .then(res => {
      console.log(id)
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
