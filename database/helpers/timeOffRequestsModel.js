const db = require('../dbConfig')

// for time_off_requests
const getTimeOffRequests = async userId => {}
const addTimeOffRequest = async (userId, request) => {} // request is object
const updateTimeOffRequest = async (timeOffRequestId, updates) => {}
const deleteTimeOffRequest = async timeOffRequestId => {}

const getTimeOffRequestsForOrg = async orgId => {} // returns a list of the above but for each employee

module.exports = {
  getTimeOffRequests,
  addTimeOffRequest,
  updateTimeOffRequest,
  deleteTimeOffRequest,
  getTimeOffRequestsForOrg
}
