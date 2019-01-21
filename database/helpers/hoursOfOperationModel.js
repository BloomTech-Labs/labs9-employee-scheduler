const db = require('../dbConfig')

//get hours of operation
const getHoursOfOperation = orgId => {
  return db('hours_of_operation as h').where({ 'h.organization_id': orgId })
}

//update hours of operation
const updateHoursOfOperation = (hourId, updates) => {
  return db('hours_of_operation as h')
    .where({ 'h.organization_id': orgId })
    .update(updates)
}

module.exports = {
  getHoursOfOperation,
  updateHoursOfOperation
}
