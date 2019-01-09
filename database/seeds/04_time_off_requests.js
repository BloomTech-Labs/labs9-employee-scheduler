const moment = require('moment')
const faker = require('faker')
const uuid = require('uuid')

const { user_ids } = require('../ids.json')

// generate random numbers between two numbers
const generateRandomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

// generate between 0 and 5 day off requests per user
// for between 1 and 14 days in the future
const generateDayOffRequests = () => {
  const numberOff = generateRandomBetween(0, 5)
  const requests = []
  for (let i = 0; i < numberOff; i++) {
    const day = generateRandomBetween(1, 14)
    if (!requests.includes(day)) {
      requests.push(day)
    }
  }
  return requests.sort()
}

const time_off_requests = []

user_ids.forEach(id => {
  const requests = generateDayOffRequests()

  for (let i = 0; i < requests.length; i++) {
    time_off_requests.push({
      id: uuid(),
      user_id: id,
      date: moment()
        .add(requests[i], 'd')
        .format('YYYY-MM-DD'),
      reason: faker.lorem.sentence(),
      status: 'pending'
    })
  }
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
