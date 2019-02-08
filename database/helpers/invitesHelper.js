const db = require('../dbConfig')
const uuid = require('uuid/v4')

const getInvite = id => {
  return db('invites')
    .where({ id })
    .first()
}

const addInvite = invite => {
  return db('invites').insert({ id: uuid(), ...invite })
}

const updateInvite = (inviteId, updates) => {
  return db('invites as i')
    .where({ 'i.id': inviteId })
    .update(updates)
}

const deleteInvite = id => {
  return db('invites')
    .where({ id })
    .del()
}

module.exports = {
  getInvite,
  addInvite,
  updateInvite,
  deleteInvite
}
