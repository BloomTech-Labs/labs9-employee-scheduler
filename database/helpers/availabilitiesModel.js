const db = require('../dbConfig')

// gets all availabilities for a user
const getAvailabilities = userId => {
  return db('availabilities as a')
    .where({ 'a.user_id': userId })
    .orderBy('a.day')
}

// gets a single availability
const getAvailability = id => {
  return db('availabilities as a')
    .where({ 'a.id': id })
    .first()
}

// adds new day, day is object
const addAvailability = (userId, day) => {
  return db('availabilities as a')
    .where({ 'a.user_id': userId })
    .insert(day)
}

// updates existing day, updates is object
const updateAvailability = (availabilityId, updates) => {
  return db('availabilities as a')
    .where({ 'a.id': availabilityId })
    .update(updates)
}

// deletes day
const deleteAvailability = availabilityId => {
  return db('availabilities as a')
    .where({ 'a.id': availabilityId })
    .del()
}

module.exports = {
  getAvailabilities,
  addAvailability,
  updateAvailability,
  deleteAvailability,
  getAvailability
}
