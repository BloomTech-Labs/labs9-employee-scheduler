const faker = require('faker')
const uuid = require('uuid/v4')
const moment = require('moment')

// Generates a new org using an id
const generateOrg = (id = uuid()) => ({
  id,
  name: faker.company.companyName(),
  description: faker.lorem.sentence()
})

// Generates a group of orgs based off a list of ids
const generateOrgs = ids => ids.map(generateOrg)

// Generates a single user based on a userId, an orgId, and a userRole
const generateUser = ({
  user_id = uuid(),
  org_id = uuid(),
  user_role = 'employee'
}) => ({
  id: user_id,
  organization_id: org_id,
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  role: user_role,
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  emailpref: faker.random.boolean(),
  phonepref: faker.random.boolean()
})

const generateUsersForOrg = ({
  org_id = uuid(),
  quantity = 6 // generateRandomBetween(5, 20) // commented this to constrain the number of employees per org
}) => {
  const users = []
  for (let i = 0; i < quantity; i++) {
    // set one owner, two supervisors, and the rest employees
    const userRole = i === 0 ? 'owner' : i < 3 ? 'supervisor' : 'employee'

    users.push(
      generateUser({
        user_id: uuid(),
        org_id: org_id,
        user_role: userRole
      })
    )
  }
  return users
}

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

const generateEvents = (userId = uuid()) => {
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
      if (Math.random() < 0.4) {
        times.push([
          // 9 to 5 shift
          9,
          17
          //generateRandomBetween(0, 12),
          //generateRandomBetween(12, 23)
        ])
      } else if (Math.random() > 0.8) {
        // created a morning shift
        times.push([0, 9])
      } else {
        times.push([17, 23]) // night shift
      }
    }
    return times
  }

  const days = generateWeekdays()
  const times = generateTimes()
  const events = []

  // Determines today's date, and uses it to get useful info about it, which
  // will be useful in generating timestamps for start and end
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const date = today.getDate()
  const dayOfWeek = today.getDay()
  const weekStart = date - dayOfWeek

  // generates availabilities for 5 days
  for (let i = 0; i < 5; i++) {
    // calculates startDate and endDate using availabile data
    const day = weekStart + days[i]
    const start = times[i][0]
    const end = times[i][1]
    const startDate = new Date(year, month, day, start)
    const endDate = new Date(year, month, day, end)

    events.push({
      id: uuid(),
      user_id: userId,
      start: startDate,
      end: endDate
    })
  }
  return events
}

// expects a userId, and an array of existing requests. Returns a random day not in the existing list
const generateDayOffRequest = ({ userId = uuid(), existing = [] }) => {
  let day
  const existingDates = existing.map(day => day.date)
  const statusRand = Math.random()
  const status =
    statusRand < 0.5 ? 'pending' : statusRand < 0.75 ? 'confirmed' : 'denied'

  while (day === undefined) {
    const candidate = generateRandomBetween(1, 14)
    if (!existingDates.includes(candidate)) {
      day = candidate
    }
  }
  return {
    id: uuid(),
    user_id: userId,
    date: moment()
      .add(day, 'd')
      .format('YYYY-MM-DD'),
    reason: faker.lorem.sentence(),
    status
  }
}

// generate between 0 and 5 day off requests per user
// for between 1 and 14 days in the future
const generateDayOffRequests = (userId = uuid()) => {
  const numberOff = generateRandomBetween(0, 5)
  const requests = []
  for (let i = 0; i < numberOff; i++) {
    requests.push(generateDayOffRequest({ userId, existing: requests }))
  }
  requests.sort()
  return requests
}

// Creates an object with values for all tables for one organization
const populateOrg = (orgId = uuid()) => {
  const organization = generateOrg(orgId)

  const users = generateUsersForOrg({ org_id: organization.id })

  let availabilities = []
  let events = []
  let timeOffRequests = []

  users.forEach(user => {
    availabilities = [...availabilities, ...generateAvailabilities(user.id)]
    events = [...events, ...generateEvents(user.id)]
    timeOffRequests = [...timeOffRequests, ...generateDayOffRequests(user.id)]
  })

  return { organization, users, availabilities, events, timeOffRequests }
}

// Takes an object with properties for each table for a single organization and inserts into a database
const insertOrg = (
  { organization, users, availabilities, events, timeOffRequests },
  knex
) => {
  return knex.transaction(async function(trx) {
    try {
      await knex('organizations')
        .insert(organization)
        .returning('id')
        .transacting(trx)
      await knex('users')
        .insert(users)
        .transacting(trx)

      const availPromise = knex('availabilities')
        .insert(availabilities)
        .transacting(trx)

      const eventsPromise = knex('events')
        .insert(events)
        .transacting(trx)

      const timeOffPromise = knex('time_off_requests')
        .insert(timeOffRequests)
        .transacting(trx)

      await Promise.all([availPromise, eventsPromise, timeOffPromise])
      return trx.commit()
    } catch (err) {
      console.log(err.message)
      return trx.rollback()
    }
  })
}

// This is a test utility that populates a database with test data
// for a single team, and returns the team as an object, along with a
// cleanup function that can be called to cleanup the data aftewards.

// It takes a knex instance, it then inserts a randomly generated
// team into knex. It returns an object with two properties:

// First: a team object with the following shape:
// { organization, users, availabilities, events, timeOffRequests }

// Second: a cleanup function, which is an async function that should be
// called to clean up the database afterwards
const generateTeamData = async knex => {
  const team = populateOrg()
  await insertOrg(team, knex)

  const cleanup = () => {
    return knex('organizations')
      .where('id', team.organization.id)
      .del()
  }

  return { team, cleanup }
}

module.exports = {
  generateOrg,
  generateOrgs,
  generateUser,
  generateUsersForOrg,
  generateAvailabilities,
  generateDayOffRequest,
  generateDayOffRequests,
  generateEvents,
  populateOrg,
  generateTeamData
}
