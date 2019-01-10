const db = require('../dbConfig')

// for time_off_requests
const getTimeOffRequests = userId => {
  if (userId) {
    return db('time_off_requests as t').where({ 't.user_id': userId })
  } else {
    return db('time_off_requests')
  }
}
const addTimeOffRequest = (userId, request) => {} // request is object
const updateTimeOffRequest = (timeOffRequestId, updates) => {}
const deleteTimeOffRequest = timeOffRequestId => {}

const getTimeOffRequestsForOrg = async orgId => {} // returns a list of the above but for each employee

module.exports = {
  getTimeOffRequests,
  addTimeOffRequest,
  updateTimeOffRequest,
  deleteTimeOffRequest,
  getTimeOffRequestsForOrg
}
