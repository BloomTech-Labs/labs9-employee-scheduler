const db = require('../dbConfig')

// for events
const getEvents = async userId => {}
const addEvent = async (userId, event) => {}
const updateEvent = async (eventId, updates) => {}
const deleteEvent = async eventId => {}

const getEventsForOrg = async orgId => {} // returns list of all events for all users for an org

module.exports = {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  getEventsForOrg
}
