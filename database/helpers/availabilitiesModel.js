const db = require('../dbConfig')

// for availabilities
const getAvailabilities = async (userId, constraints) => {} // default to showing next week, constraints is object
const addAvailability = async (userId, day) => {} // adds new day, dayis object
const updateAvailability = async (availabilityId, updates) => {} // updates existing day, updates is object
const deleteAvailability = async availabilityId => {} // deletes day

module.exports = {
  getAvailabilities,
  addAvailability,
  updateAvailability,
  deleteAvailability
}
