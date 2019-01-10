const uuid = require('uuid')
const { org_ids, user_ids } = require('../ids.json')

// NOTE
// all code copied from availabilities seed for now
// includes minor changes

// generates a ratio so we can match an unequal number of orgs to users ie 500 / 25 = 20
// we use this to only add availability for supervisors and employees
// in this case skipping ever 20th user indexed at 0
const ratio = user_ids.length / org_ids.length

// initialize availabilities array
const events = []

// generate random numbers between two numbers
const generateRandomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

// generate sorted array of 5 numbers between 0 and 6 with no duplicates
const generateWeekdays = () => {
  const days = []
  while (days.length < 5) {
    const day = generateRandomBetween(0, 6)
    if (!days.includes(day)) {
      days.push(day)
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

// loop over users array to generate events
user_ids.forEach((id, index) => {
  // check that user is not owner (every first person per org (as shown by ratio))
  if (index % ratio !== 0) {
    const days = generateWeekdays()
    const times = generateTimes()

    for (let i = 0; i < 5; i++) {
      events.push({
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
  await knex('events').truncate()
  for (let i = 0; i < events.length / 100; i++) {
    await knex('events').insert(events.slice(i * 100, (i + 1) * 100))
  }
}
