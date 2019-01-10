const db = require('../dbConfig')

const getOrgs = async () => {
  const orgs = await db('organizations')
  return orgs
}
const addOrg = async org => {}

const updateOrg = async orgId => {}
const deleteOrg = async orgId => {}

module.exports = {
  getOrgs,
  addOrg,
  updateOrg,
  deleteOrg
}
