const db = require('../dbConfig')

// organized by table

// for orgs
const getOrgs = async () => {}
const addOrg = async () => {}
const updateOrg = async orgId => {}
const deleteOrg = async orgId => {}

// for users
const getUsers = async orgId => {} // if no param all users
const addUser = async (orgId, user) => {} // user is object
const updateUser = async (userId, updates) => {} // updates is object
const deleteUser = async userId => {} // deletes everything dependent on the user

// for availabilities
const getAvailabilities = async (userId, constraints) => {} // default to showing next week, constraints is object
const addAvailability = async (userId, day) => {} // adds new day, dayis object
const updateAvailability = async (availabilityId, updates) => {} // updates existing day, updates is object
const deleteAvailability = async availabilityId => {} // deletes day

// for time_off_requests
const getTimeOffRequests = async userId => {}
const addTimeOffRequest = async (userId, request) => {} // request is object
const updateTimeOffRequest = async (timeOffRequestId, updates) => {}
const deleteTimeOffRequest = async timeOffRequestId => {}

const getTimeOffRequestsForOrg = async orgId => {} // returns a list of the above but for each employee

// for events
const getEvents = async userId => {}
const addEvent = async (userId, event) => {}
const updateEvent = async (eventId, updates) => {}
const deleteEvent = async eventId => {}

const getEventsForOrg = async orgId => {} // returns list of all events for all users for an org

module.exports = {
  getOrgs,
  addOrg,
  updateOrg,
  deleteOrg,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getAvailabilities,
  addAvailability,
  updateAvailability,
  deleteAvailability,
  getTimeOffRequests,
  addTimeOffRequest,
  updateTimeOffRequest,
  deleteTimeOffRequest,
  getTimeOffRequestsForOrg,
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  getEventsForOrg
}
