const db = require('../dbConfig')
const uuid = require('uuid/v4')

//get hours of operation
const getHoursOfOperation = orgId => {
  return db('hours_of_operation as h')
    .where({ 'h.organization_id': orgId })
    .orderBy('h.day')
}

//update hours of operation
const updateHoursOfOperation = (hourId, updates) => {
  return db('hours_of_operation as h')
    .where({ 'h.id': hourId })
    .update(updates)
}

const addHour = hour => {
  const id = uuid()
  return db('hours_of_operation as h')
    .insert({
      id,
      ...hour
    })
    .then(() => id)
}

module.exports = {
  getHoursOfOperation,
  updateHoursOfOperation,
  addHour
}
