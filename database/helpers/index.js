const {
  getOrgs,
  addOrg,
  updateOrg,
  deleteOrg
} = require('./organizationsModel')
const { getUsers, addUser, updateUser, deleteUser } = require('./usersModel')
const {
  getAvailabilities,
  addAvailability,
  updateAvailability,
  deleteAvailability
} = require('./availabilitiesModel')
const {
  getTimeOffRequests,
  addTimeOffRequest,
  updateTimeOffRequest,
  deleteTimeOffRequest,
  getTimeOffRequestsForOrg
} = require('./timeOffRequestsModel')
const {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  getEventsForOrg
} = require('./eventsModel')

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
