const {
  generateOrgs,
  generateUser,
  generateHoursOfOperation,
  generateAvailabilities,
  generateDayOffRequests,
  generateEvents
} = require('../utils/generateData')
const { user_ids, org_ids } = require('../ids.json')

const organizations = generateOrgs(org_ids)

// generates a ratio so we can match an unequal number of orgs to users ie 500 / 25 = 20
const ratio = user_ids.length / org_ids.length

// initialize users array
const users = []
let HOOs = []
let availabilities = []
let events = []
let timeOffRequests = []

// loop through both id arrays to get eveything mixed properly
org_ids.forEach((org_id, id_index) => {
  const HOO = generateHoursOfOperation(org_id)
  HOOs = [...HOOs, ...HOO]

  for (let i = 0; i < ratio; i++) {
    // set one owner, two supervisors, and the rest employees
    const userRole = i === 0 ? 'owner' : i < 3 ? 'supervisor' : 'employee'
    const userStats = {
      user_id: user_ids[i + ratio * id_index],
      org_id: org_id,
      user_role: userRole
    }
    const user = generateUser(userStats)
    users.push(user)

    const userAvailabilities = generateAvailabilities(user.id, HOO)
    const userTimeOffRequests = generateDayOffRequests(user.id)
    const userEvents = generateEvents(
      user.id,
      userAvailabilities,
      userTimeOffRequests
    )

    timeOffRequests = [...timeOffRequests, ...userTimeOffRequests]
    events = [...events, ...userEvents]
    availabilities = [...availabilities, ...userAvailabilities]
  }
})

exports.seed = knex =>
  knex('organizations')
    .delete()
    .then(() => knex('organizations').insert(organizations))
    .then(() => knex('hours_of_operation').insert(HOOs))
    .then(() => knex('users').insert(users))
    .then(() => knex('time_off_requests').insert(timeOffRequests))
    .then(() => knex('availabilities').insert(availabilities))
    .then(() => knex('events').insert(events))
