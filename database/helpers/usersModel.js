const db = require('../dbConfig')
const uuid = require('uuid/v4')

// creates hours for 7 days for a new org
const insertAvailsForNewUser = async ({ id: user_id, organization_id }) => {
  let hoursOO = await db('hours_of_operation')
    .where('organization_id', organization_id)
    .orderBy('day')

  const avails = hoursOO.map(({ day, open_time, close_time, closed }) => ({
    id: uuid(),
    user_id,
    day,
    start_time: open_time,
    end_time: close_time,
    off: closed
  }))

  return db('availabilities')
    .insert(avails)
    .returning('id')
}

// if no param all users
const getUsers = orgId => {
  if (orgId) {
    return db('users as u').where({ 'u.organization_id': orgId })
  } else {
    return db('users')
  }
}
// get a single user
const getUser = id => {
  return db('users')
    .where({ id })
    .first()
}

const addUser = async user => {
  const newUser = { ...user, id: uuid() }
  await db('users').insert(newUser)
  const result = await insertAvailsForNewUser(newUser)
  return newUser
}

const updateUser = (userId, updates) => {
  return db('users as u')
    .where({ 'u.id': userId })
    .update(updates)
}

const deleteUser = userId => {
  return db('users as u')
    .where({ 'u.id': userId })
    .del()
}

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getUser
}
