const organizations = require('./organizationsModel')
const users = require('./usersModel')
const availabilities = require('./availabilitiesModel')
const timeOffRequests = require('./timeOffRequestsModel')
const events = require('./eventsModel')

module.exports = {
  ...organizations,
  ...users,
  ...availabilities,
  ...timeOffRequests,
  ...events
}
