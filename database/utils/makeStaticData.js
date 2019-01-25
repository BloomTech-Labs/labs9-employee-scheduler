const {
  generateHoursOfOperation,
  generateUsersForOrg,
  generateAvailabilities,
  generateEvents,
  generateDayOffRequests
} = require('./generateData')
const fs = require('fs')

// Creates an object with values for all tables for one organization
const populateStaticOrg = (size = 10) => {
  const organization = {
    id: '9126df31-2607-4166-9c0c-d0a300c59c62',
    name: 'Cadence',
    description:
      'Adipisci beatae amet qui sed porro totam voluptates voluptatem.'
  }

  let users = generateUsersForOrg({ org_id: organization.id, quantity: size })

  // update owner
  users = users.map(user => {
    if (user.role === 'owner') {
      return {
        ...user,
        id: 'yJgErAY0haNm0zdLSvzLUed6UXK2',
        first_name: 'Cadence',
        last_name: 'Sassafras',
        email: 'fake0@gmail.com'
      }
    } else {
      return user
    }
  })

  let employeeSeeds = [
    {
      id: 'OsdZPBFJICgfyThBytBZhHSDtf82',
      first_name: 'Kam',
      last_name: 'Bowman',
      role: 'supervisor',
      email: 'fake1@gmail.com',
      phone: '334.284.7139 x300',
      emailpref: true,
      phonepref: true
    },
    {
      id: 'gTuUJ2rhsVN95uWEbMkQEiZ350v1',
      first_name: 'Adam',
      last_name: 'Adam Hinckley',
      role: 'supervisor',
      email: 'fake2@gmail.com',
      phone: '1-281-076-2473 x751',
      emailpref: true,
      phonepref: true
    },
    {
      id: 'v8tNYGQe1XdzZlrPerWW5Ujvfro1',
      first_name: 'Carlos',
      last_name: 'Lantigua',
      role: 'supervisor',
      email: 'fake3@gmail.com',
      phone: '(490) 619-0607',
      emailpref: true,
      phonepref: true
    },
    {
      id: '9e5utldnG9hrdELay4WiK9LYQ9i2',
      first_name: 'Rahul',
      last_name: 'Desai',
      role: 'supervisor',
      email: 'fake4@gmail.com',
      phone: '(749) 472-4501',
      emailpref: false,
      phonepref: false
    },
    {
      id: 'nQYIXq5M1ZevenJYz2NRBytC57Q2',
      first_name: 'Samuel',
      last_name: 'Machat',
      role: 'supervisor',
      email: 'fake5@gmail.com',
      phone: '753.321.4320 x6991',
      emailpref: false,
      phonepref: false
    },
    {
      id: 'xsc44X6okFgw3V2OPIIcGIMXkkz1',
      first_name: 'Chasity',
      last_name: 'Gerhold',
      role: 'employee',
      email: 'test2@test.com',
      phone: '325-317-5476 x405',
      emailpref: true,
      phonepref: false
    },
    {
      id: 'eSDd76tYvYR6CPPqwes00u3DW8M2',
      first_name: 'Murphy',
      last_name: 'Lesch',
      role: 'employee',
      email: 'test3@gmail.com',
      phone: '(685) 606-5823',
      emailpref: false,
      phonepref: true
    },
    {
      id: '9KokgBFFcjgFBQ9viY2pFrFbH4D2',
      first_name: 'Madisyn',
      last_name: 'Hessel',
      role: 'employee',
      email: 'test1@test.com',
      phone: '080.566.7382 x91872',
      emailpref: false,
      phonepref: false
    },
    {
      id: 'ReJh9XiUJmhMonIl2p8Kky35Gpp2',
      first_name: 'Clark',
      last_name: 'Kent',
      role: 'supervisor',
      email: 'test4@gmail.com',
      phone: '(038) 077-3195',
      emailpref: true,
      phonepref: false
    }
  ]

  // add non-owner static data into generated data
  employeeSeeds.forEach((seed, i) => {
    users[i + 1] = {
      ...users[i + 1],
      ...seed
    }
  })

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
    hoursOfOperation: generateHoursOfOperation(organization.id)
  }
}

fs.writeFile(
  'static_seed.json',
  JSON.stringify(populateStaticOrg()),
  console.log
)
