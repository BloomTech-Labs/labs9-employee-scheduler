const db = require('../dbConfig')

// for availabilities
const getAvailabilities = async (userId, constraints) => {} // default to showing next week, constraints is object
const addAvailability = async (userId, day) => {} // adds new day, dayis object

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
  deleteAvailability
}
