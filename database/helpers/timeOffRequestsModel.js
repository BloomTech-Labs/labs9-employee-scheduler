const db = require('../dbConfig')
const uuid = require('uuid/v4')

// for time_off_requests by user
const getTimeOffRequests = userId => {
  return db('time_off_requests as t').where({ 't.user_id': userId })
}

// gets time off request by id
const getTimeOffRequest = id => {
  return db('time_off_requests as t')
    .where({ 't.id': id })
    .first()
}

// request is object returns new id
const addTimeOffRequest = request => {
  const id = uuid()
  return db('time_off_requests')
    .insert({ id, ...request })
    .then(() => id)
}

const updateTimeOffRequest = (timeOffRequestId, status) => {
  return db('time_off_requests as t')
    .where({ 't.id': timeOffRequestId })
    .update(status)
}

const deleteTimeOffRequest = timeOffRequestId => {
  return db('time_off_requests as t')
    .where({ 't.id': timeOffRequestId })
    .del()
}

// returns a list of the above but for each employee
const getTimeOffRequestsForOrg = orgId => {
  return db('time_off_requests as t')
    .fullOuterJoin('users as u', 't.user_id', 'u.id')
    .where({ 'u.organization_id': orgId })
}

module.exports = {
  getTimeOffRequests,
  getTimeOffRequest,
  addTimeOffRequest,
  updateTimeOffRequest,
  deleteTimeOffRequest,
  getTimeOffRequestsForOrg
}
