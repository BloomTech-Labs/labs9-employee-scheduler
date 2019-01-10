const db = require('../dbConfig')

// for availabilities
const getAvailabilities = (userId, constraints) => {
  if (userId) {
    return db('availabilities as a')
      .where({ 'a.user_id': userId })
      .return(constraints)
  }
} // default to showing next week, constraints is object
const addAvailability = (userId, day) => {
  return db('availabilities as a')
    .where({ 'a.user_id': userId })
    .insert(day)
} // adds new day, dayis object
const updateAvailability = async (availabilityId, updates) => {} // updates existing day, updates is object
const deleteAvailability = async availabilityId => {} // deletes day

module.exports = {
  getAvailabilities,
  addAvailability,
  updateAvailability,
  deleteAvailability
}
