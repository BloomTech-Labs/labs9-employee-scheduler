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
