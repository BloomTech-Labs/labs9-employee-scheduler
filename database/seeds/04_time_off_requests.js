const { generateDayOffRequests } = require('../utils/generateData')
const { user_ids } = require('../ids.json')

let time_off_requests = []

user_ids.forEach(id => {
  time_off_requests = [...time_off_requests, ...generateDayOffRequests(id)]
})

// insert records in batches of 100 otherwise sqlite will complain about too many variables
exports.seed = async knex => {
  await knex('time_off_requests').truncate()
  for (let i = 0; i < time_off_requests.length / 100; i++) {
    await knex('time_off_requests').insert(
      time_off_requests.slice(i * 100, (i + 1) * 100)
    )
  }
}
