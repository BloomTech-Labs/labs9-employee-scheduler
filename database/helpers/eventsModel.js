const db = require('../dbConfig')
const uuid = require('uuid/v4')

// for events by userId
const getEvents = userId => {
  return db('events as e').where({ 'e.user_id': userId })
}

// gets an event by its id
const getEvent = id => db('events').where('id', id)

const addEvent = event => {
  const id = uuid()
  return db('events')
    .insert({
      id,
      ...event
    })
    .then(() => id)
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
  getEvent,
  addEvent,
  updateEvent,
  deleteEvent,
  getEventsForOrg
}
