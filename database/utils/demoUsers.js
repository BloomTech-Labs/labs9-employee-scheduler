const uuid = require('uuid/v4')
const moment = require('moment')

const demoUsers = org_id => {
  const users = [
    {
      id: uuid(),
      organization_id: org_id,
      first_name: 'Walkthrough',
      last_name: 'Wendy',
      role: 'employee',
      email: 'wendy@example.com',
      phone: '111-111-1111',
      emailpref: true,
      phonepref: false
    },
    {
      id: uuid(),
      organization_id: org_id,
      first_name: 'Aaron',
      last_name: 'Demo',
      role: 'employee',
      email: 'aaron@example.com',
      phone: '222-222-2222',
      emailpref: false,
      phonepref: true
    }
  ]
  return users
}

const demoAvailabilities = (users, offset) => {
  let availabilities = []
  const start_time = moment
    .utc({ hours: 9 })
    .subtract(offset, 'minutes')
    .format('HH:mm')
  const end_time = moment
    .utc({ hours: 17 })
    .subtract(offset, 'minutes')
    .format('HH:mm')
  users.forEach(user => {
    availabilities.push(
      {
        id: uuid(),
        user_id: user.id,
        day: 0,
        start_time: start_time,
        end_time: end_time,
        off: false
      },
      {
        id: uuid(),
        user_id: user.id,
        day: 1,
        start_time: start_time,
        end_time: end_time,
        off: false
      },
      {
        id: uuid(),
        user_id: user.id,
        day: 2,
        start_time: start_time,
        end_time: end_time,
        off: false
      },
      {
        id: uuid(),
        user_id: user.id,
        day: 3,
        start_time: start_time,
        end_time: end_time,
        off: false
      },
      {
        id: uuid(),
        user_id: user.id,
        day: 4,
        start_time: start_time,
        end_time: end_time,
        off: false
      },
      {
        id: uuid(),
        user_id: user.id,
        day: 5,
        start_time: start_time,
        end_time: end_time,
        off: false
      },
      {
        id: uuid(),
        user_id: user.id,
        day: 6,
        start_time: start_time,
        end_time: end_time,
        off: false
      }
    )
  })
  return availabilities
}

const demoTimeOff = (users, offset) => {
  let timeOffRequests = []
  const rand = Math.random() * 4 + 1
  users.forEach(user => {
    timeOffRequests.push({
      id: uuid(),
      user_id: user.id,
      start: moment
        .utc()
        .add(rand, 'd')
        .startOf('day')
        .subtract(offset, 'minutes')
        .format(),
      end: moment
        .utc()
        .subtract(rand, 'd')
        .endOf('day')
        .add(offset, 'minutes')
        .format(),
      reason: 'Possimus occaecati blanditiis beatae sit id.',
      status: 'pending'
    })
  })
  return timeOffRequests
}

const initDemo = ({ users, availabilities, timeOffRequests }, knex) => {
  return knex.transaction(async function(trx) {
    try {
      await knex('users')
        .insert(users)
        .transacting(trx)

      const availPromise = knex('availabilities')
        .insert(availabilities)
        .transacting(trx)

      const timeOffPromise = knex('time_off_requests')
        .insert(timeOffRequests)
        .transacting(trx)

      await Promise.all([availPromise, timeOffPromise])
      return trx.commit()
    } catch (err) {
      console.log(err.message)
      return trx.rollback()
    }
  })
}

module.exports = {
  demoUsers,
  demoAvailabilities,
  demoTimeOff,
  initDemo
}
