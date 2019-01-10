const db = require('../dbConfig')

// for time_off_requests
const getTimeOffRequests = userId => {
  if (userId) {
    return db('time_off_requests as t').where({ 't.user_id': userId })
  } else {
    return db('time_off_requests')
  }
}

// request is object
const addTimeOffRequest = (userId, request) => {
  return db('time_off_requests as t')
    .where({ 't.id': userId })
    .insert(request)
}

const updateTimeOffRequest = (timeOffRequestId, updates) => {
  return db('time_off_requests as t')
    .where({ 't.id': timeOffRequestId })
    .update(updates)
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
  addTimeOffRequest,
  updateTimeOffRequest,
  deleteTimeOffRequest,
  getTimeOffRequestsForOrg
}
