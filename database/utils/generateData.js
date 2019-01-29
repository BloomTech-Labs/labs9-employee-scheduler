const faker = require('faker')
const uuid = require('uuid/v4')
const moment = require('moment')

const addTime = (time, { hours, minutes }) => {
  const timeObj = moment.utc(time, 'HH:aa')
  if (typeof hours === 'number') {
    timeObj.add(hours, 'hour')
  }
  if (typeof miutes === 'number') {
    timeObj.add(minutes, 'minute')
  }
  return timeObj.format('HH:mm')
}

// Generates a new org using an id
const generateOrg = (id = uuid()) => ({
  id,
  name: faker.company.companyName()
})

// Generates a group of orgs based off a list of ids
const generateOrgs = ids => ids.map(generateOrg)

// Generates hours of operation by org id
const generateHoursOfOperation = (org_id = uuid()) => {
  let hours = []
  let day = [0, 1, 2, 3, 4, 5, 6]
  for (let i = 0; i < 7; i++) {
    let open = Math.random() > 0.3
    let thisDay = {
      id: uuid(),
      organization_id: org_id,
      day: day[i],
      open_time: moment({ hours: 9 })
        .utc()
        .format('HH:mm'),
      close_time: moment({ hours: 17 })
        .utc()
        .format('HH:mm'),
      closed: !open
    }
    hours.push(thisDay)
  }

  return hours
}

// Generates a group of orgs' hours of operation based off a list of ids
const generateAllHoursOfOperation = ids => {
  return ids.reduce((acc, id) => {
    const theseHours = generateHoursOfOperation(id)
    return [...acc, ...theseHours]
  }, [])
}
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
const generateAvailabilities = (userId, HOO) => {
  // generate random numbers between two numbers

  return HOO.map(hours => {
    const off = hours.closed ? true : Math.random() < 0.25
    const startOffset = off ? 0 : generateRandomBetween(0, 3)
    const endOffset = off ? 0 : generateRandomBetween(0, 4)
    console.log(endOffset)
    const start_time = addTime(hours.open_time, { hours: startOffset })
    const end_time = addTime(hours.close_time, { hours: -1 * endOffset })
    console.log(end_time)

    return {
      day: hours.day,
      id: uuid(),
      user_id: userId,
      start_time,
      end_time,
      off
    }
  })
}

const generateEvents = (userId = uuid(), availabilities, timeOffRequests) => {
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
    statusRand < 0.5 ? 'pending' : statusRand < 0.75 ? 'approved' : 'denied'

  while (day === undefined) {
    const candidate = generateRandomBetween(1, 14)
    if (!existingDates.includes(candidate)) {
      day = candidate
    }
  }

  const dateOff = moment().add(day, 'd')

  return {
    id: uuid(),
    user_id: userId,
    start: dateOff
      .startOf('day')
      .utc()
      .format('HH:mm'),
    end: dateOff
      .endOf('day')
      .utc()
      .format('HH:mm'),
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
const populateOrg = ({ orgId = uuid(), size }) => {
  const organization = generateOrg(orgId)

  const hoursOfOperation = generateHoursOfOperation(organization.id)

  const users = generateUsersForOrg({ org_id: organization.id, quantity: size })

  let availabilities = []
  let events = []
  let timeOffRequests = []

  users.forEach(user => {
    availabilities = [...availabilities, ...generateAvailabilities(user.id)]
    events = [...events, ...generateEvents(user.id)]
    timeOffRequests = [...timeOffRequests, ...generateDayOffRequests(user.id)]
  })

  return {
    organization,
    users,
    availabilities,
    events,
    timeOffRequests,
    hoursOfOperation
  }
}

// Takes an object with properties for each table for a single organization and inserts into a database
const insertOrg = (
  {
    organization,
    users,
    availabilities,
    events,
    timeOffRequests,
    hoursOfOperation
  },
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

      const hoursOfOperationPromise = knex('hours_of_operation')
        .insert(hoursOfOperation)
        .transacting(trx)

      await Promise.all([
        availPromise,
        eventsPromise,
        timeOffPromise,
        hoursOfOperationPromise
      ])
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
const generateTeamData = async (knex, size) => {
  const team = populateOrg({ size })
  await insertOrg(team, knex)

  const cleanup = () => {
    return knex('organizations')
      .where('id', team.organization.id)
      .del()
  }

  return { team, cleanup }
}

const structureEmployees = org => {
  let { users: employees, timeOffRequests, availabilities, events } = org
  // Grab the availabilities for each employee and crunch the data together
  // into an object of key value pairs where each key is a user id and the value
  // is an array of the availabilities for that user
  availabilities = availabilities.reduce((acc, current) => {
    // to display the date nicely for the front end to consume
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
    const { user_id, id, day, start_time, end_time } = current
    const newItem = {
      id,
      day: weekdays[day],
      time: `${start_time}am-${end_time - 12}pm`
    }

    if (acc[user_id]) {
      acc[user_id].push(newItem)
    } else {
      acc[user_id] = [newItem]
    }

    return acc
  }, {})

  // Grab the time off requests for each employee. The data is crunched in
  // the same way: key value pairs where each key is a user id and the value
  // is an array of the time off requests for that user
  timeOffRequests = timeOffRequests.reduce((acc, current) => {
    const { user_id } = current

    if (acc[user_id]) {
      acc[user_id].push(current)
    } else {
      acc[user_id] = [current]
    }

    return acc
  }, {})

  // do the same as above with events
  events = events.reduce((acc, current) => {
    const { user_id } = current

    if (acc[user_id]) {
      acc[user_id].push(current)
    } else {
      acc[user_id] = [current]
    }

    return acc
  }, {})

  // Fourth, map over the employees and add the availabilies and time off requests
  const combined = employees.map(employee => {
    const { id } = employee

    return {
      ...employee,
      availabilities: availabilities[id] ? [...availabilities[id]] : [],
      time_off_requests: timeOffRequests[id] ? [...timeOffRequests[id]] : [],
      events: events[id] ? [...events[id]] : []
    }
  })

  return combined
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
  generateTeamData,
  structureEmployees,
  generateHoursOfOperation,
  generateAllHoursOfOperation
}
