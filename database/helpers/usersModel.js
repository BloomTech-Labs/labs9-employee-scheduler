const db = require('../dbConfig')

// for users
const getUsers = async orgId => {} // if no param all users
const addUser = async (orgId, user) => {} // user is object
const updateUser = async (userId, updates) => {} // updates is object
const deleteUser = async userId => {} // deletes everything dependent on the user

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser
}
