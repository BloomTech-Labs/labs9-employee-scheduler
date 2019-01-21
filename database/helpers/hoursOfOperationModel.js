const db = require('../dbConfig')
const uuid = require('uuid/v4')

//get hours of operation
const getHoursOfOperation = orgId => {
  return db('hours_of_operation as h').where({ 'h.organization_id': orgId })
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

  return db('hours_of_operation as h').insert(...hours)
}

module.exports = {
  getHoursOfOperation,
  updateHoursOfOperation,
  addHour,
  insertHoursForNewOrg
}
