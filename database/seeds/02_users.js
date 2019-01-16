const { generateUser } = require('../utils/generateData')
const { org_ids, user_ids } = require('../ids.json')

// generates a ratio so we can match an unequal number of orgs to users ie 500 / 25 = 20
const ratio = user_ids.length / org_ids.length

// initialize users array
const users = []

// loop through both id arrays to get eveything mixed properly
org_ids.forEach((org_id, id_index) => {
  for (let i = 0; i < ratio; i++) {
    // set one owner, two supervisors, and the rest employees
    const userRole = i === 0 ? 'owner' : i < 3 ? 'supervisor' : 'employee'

    users.push(
      generateUser({
        user_id: user_ids[i + ratio * id_index],
        org_id: org_id,
        user_role: userRole
      })
    )
  }
})

// insert records in batches of 100 otherwise sqlite will complain about too many variables
exports.seed = async knex => {
  await knex('users').delete()
  for (let i = 0; i < user_ids.length / 100; i++) {
    await knex('users').insert(users.slice(i * 100, (i + 1) * 100))
  }
}
