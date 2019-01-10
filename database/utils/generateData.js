const faker = require('faker')
const uuid = require('uuid')
const moment = require('moment')

// Generates a new org using an id
const generateOrg = id => ({
  id,
  name: faker.company.companyName(),
  description: faker.lorem.sentence()
})

// Generates a group of orgs based off a list of ids
const generateOrgs = ids => ids.map(generateOrg)

// Generates a single user based on a userId, an orgId, and a userRole
const generateUser = ({ user_id, org_id, user_role }) => ({
  id: user_id,
  organization_id: org_id,
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  role: user_role,
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber()
})

const generateRandomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

// Constraints:
// only create availability for supervisors and employees
// randomly pick 5 available days for each of those users
// for those five days, pick two of them to have reduced hours
const generateAvailabilities = userId => {
  // generate random numbers between two numbers

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
        times.push([
          generateRandomBetween(0, 12),
          generateRandomBetween(12, 23)
        ])
      } else {
        times.push([0, 23])
      }
    }
    return times
  }

  const days = generateWeekdays()
  const times = generateTimes()
  const availabilities = []

  // generates availabilities for 5 days
  for (let i = 0; i < 5; i++) {
    availabilities.push({
      id: uuid(),
      user_id: userId,
      day: days[i],
      start_time: times[i][0],
      end_time: times[i][1]
    })
  }
  return availabilities
}

const generateEvents = userId => {
  // generate random numbers between two numbers

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

  // randomly give some days full events and other days partial
  const generateTimes = () => {
    const times = []
    for (let i = 0; i < 5; i++) {
      if (Math.random() > 0.4) {
        times.push([
          generateRandomBetween(0, 12),
          generateRandomBetween(12, 23)
        ])
      } else {
        times.push([0, 23])
      }
    }
    return times
  }

  const days = generateWeekdays()
  const times = generateTimes()
  const events = []

  // generates availabilities for 5 days
  for (let i = 0; i < 5; i++) {
    events.push({
      id: uuid(),
      user_id: userId,
      day: days[i],
      start_time: times[i][0],
      end_time: times[i][1]
    })
  }
  return events
}

// expects a userId, and an array of existing requests. Returns a random day not in the existing list
const generateDayOffRequest = ({ user_id, existing = [] }) => {
  let day
  const existingDates = existing.map(day => day.date)
  const statusRand = generateRandomBetween(0, 2)
  const status =
    statusRand < 0.5 ? 'pending' : statusRand < 0.75 ? 'confirmed' : 'denied'

  while (!day) {
    const candidate = generateRandomBetween(1, 14)
    if (!existingDates.includes(candidate)) {
      day = candidate
    }
  }
  return {
    id: uuid(),
    user_id,
    date: moment()
      .add(day, 'd')
      .format('YYYY-MM-DD'),
    reason: faker.lorem.sentence(),
    status
  }
}

// generate between 0 and 5 day off requests per user
// for between 1 and 14 days in the future
const generateDayOffRequests = userId => {
  const numberOff = generateRandomBetween(0, 5)
  const requests = []
  for (let i = 0; i < numberOff; i++) {
    generateDayOffRequest({ userId, existing: requests })
  }
  requests.sort()
  return requests
}

module.exports = {
  generateOrg,
  generateOrgs,
  generateUser,
  generateAvailabilities,
  generateDayOffRequest,
  generateDayOffRequests,
  generateEvents
}
