const db = require('../dbConfig')

//get hours of operation
const getHoursOfOperation = orgId => {
  return db('hours_of_operation as h')
    .where({ 'h.organization_id': orgId })
    .first()
}

//update hours of operation
const updateHoursOfOperation = (orgId, updates) => {
  return db('hours_of_operation as h')
    .where({ 'h.organization_id': orgId })
    .update(updates)
}

module.exports = {
  getHoursOfOperation,
  updateHoursOfOperation
}
