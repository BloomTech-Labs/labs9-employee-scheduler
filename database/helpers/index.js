const organizations = require('./organizationsModel')
const users = require('./usersModel')
const availabilities = require('./availabilitiesModel')
const timeOffRequests = require('./timeOffRequestsModel')
const events = require('./eventsModel')
const employees = require('./employeesHelper')
const dashboard = require('./dashboardHelper')
const hoursOfOperation = require('./hoursOfOperationModel')
const invites = require('./invitesModel')

module.exports = {
  ...organizations,
  ...users,
  ...availabilities,
  ...timeOffRequests,
  ...events,
  ...employees,
  ...dashboard,
  ...hoursOfOperation,
  ...invites
}
