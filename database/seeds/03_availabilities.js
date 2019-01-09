const uuid = require('uuid')
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
const availabilities = []

// generate random numbers between two numbers
const generateRandomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

// generate sorted array of 5 numbers between 0 and 6 with no duplicates
const generateWeekdays = () => {
  const days = []
  for (let i = 0; i < 5; i++) {
    while (true) {
      const day = generateRandomBetween(0, 6)
      if (!days.includes(day)) {
        days.push(day)
        break
      }
    }
  }
  return days.sort()
}

// randomly give some days full availability and other days partial
const generateTimes = () => {
  const times = []
  for (let i = 0; i < 5; i++) {
    if (Math.random() > 0.4) {
      times.push([generateRandomBetween(0, 12), generateRandomBetween(12, 23)])
    } else {
      times.push([0, 23])
    }
  }
  return times
}

// loop over users array to generate availabilities
user_ids.forEach((id, index) => {
  // check that user is not owner (every first person per org (as shown by ratio))
  if (index % ratio !== 0) {
    const days = generateWeekdays()
    const times = generateTimes()

    for (let i = 0; i < 5; i++) {
      availabilities.push({
        id: uuid(),
        user_id: id,
        day: days[i],
        start_time: times[i][0],
        end_time: times[i][1]
      })
    }
  }
})

// insert records in batches of 100 otherwise sqlite will complain about too many variables
exports.seed = async knex => {
  await knex('availabilities').truncate()
  for (let i = 0; i < availabilities.length / 100; i++) {
    await knex('availabilities').insert(
      availabilities.slice(i * 100, (i + 1) * 100)
    )
  }
}
