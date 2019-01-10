const db = require('../dbConfig')
const uuid = require('uuid')

// for events
const getEvents = userId => {
  return db('events as e').where({ 'e.user_id': userId })
}

const addEvent = (userId, event) => {
  return db('events as e').insert({
    'e.id': uuid(),
    'e.user_id': userId,
    ...event
  })
}
const updateEvent = (eventId, updates) => {
  return db('events as e')
    .where({ 'e.id': eventId })
    .update(updates)
}
const deleteEvent = eventId => {
  return db('events as e')
    .where({ 'e.id': eventId })
    .del()
}

const getEventsForOrg = orgId => {
  return db('events as e')
    .fullOuterJoin('users as u', 'e.user_id', 'u.id')
    .where({ 'u.organization_id': orgId })
} // returns list of all events for all users for an org

module.exports = {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  getEventsForOrg
}
