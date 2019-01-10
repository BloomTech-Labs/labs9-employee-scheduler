const { generateEvents } = require('../utils/generateData')
const { org_ids, user_ids } = require('../ids.json')

// NOTE
// all code copied from availabilities seed for now
// includes minor changes

// generates a ratio so we can match an unequal number of orgs to users ie 500 / 25 = 20
// we use this to only add availability for supervisors and employees
// in this case skipping ever 20th user indexed at 0
const ratio = user_ids.length / org_ids.length

// initialize availabilities array
let events = []

user_ids.forEach((id, index) => {
  // check that user is not owner (every first person per org (as shown by ratio))
  if (index % ratio !== 0) {
    events = [...events, ...generateEvents(id)]
  }
})

// insert records in batches of 100 otherwise sqlite will complain about too many variables
exports.seed = async knex => {
  await knex('events').truncate()
  for (let i = 0; i < events.length / 100; i++) {
    await knex('events').insert(events.slice(i * 100, (i + 1) * 100))
  }
}
