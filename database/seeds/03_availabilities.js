const { generateAvailabilities } = require('../utils/generateData')
const { org_ids, user_ids } = require('../ids.json')

// data model with defaults
// {
//   id: // required --> uuid
//   user_id: // required --> uuid
//   date: // required --> integer 0-6
//   start_time: // will default to start of day --> integer 0-23
//   end_time: // will default to end of day --> integer 0-23
// }

// Constraints:
// only create availability for supervisors and employees
// randomly pick 5 available days for each of those users
// for those five days, pick two of them to have reduced hours

// generates a ratio so we can match an unequal number of orgs to users ie 500 / 25 = 20
// we use this to only add availability for supervisors and employees
// in this case skipping ever 20th user indexed at 0
const ratio = user_ids.length / org_ids.length

// initialize availabilities array
let availabilities = []

// loop over users array to generate availabilities
user_ids.forEach((id, index) => {
  // check that user is not owner (every first person per org (as shown by ratio))
  if (index % ratio !== 0) {
    availabilities = [...availabilities, ...generateAvailabilities(id)]
  }
})

// insert records in batches of 100 otherwise sqlite will complain about too many variables
exports.seed = async knex => {
  await knex('availabilities').delete()
  for (let i = 0; i < availabilities.length / 100; i++) {
    await knex('availabilities').insert(
      availabilities.slice(i * 100, (i + 1) * 100)
    )
  }
}
