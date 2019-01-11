const db = require('../dbConfig')

const getEmployees = async orgId => {
  const employees = await db('users as u').where({ 'u.organization_id': orgId })

  const availabilities = await db('users as u')
    .where({ 'u.organization_id': orgId })
    .join('availabilities as a', { 'u.id': 'a.user_id' })
    .select(
      'u.id as user_id',
      'a.id as availability_id',
      'a.day',
      'a.start_time',
      'a.end_time'
    )
    .reduce((acc, current) => {
      const { user_id, availability_id, day, start_time, end_time } = current
      const newItem = {
        user_id,
        id: availability_id,
        day,
        start_time,
        end_time
      }

      if (acc[user_id]) {
        acc[user_id].push(newItem)
      } else {
        acc[user_id] = [newItem]
      }

      return acc
    }, {})

  const timeOffRequests = await db('users as u')
    .where({ 'u.organization_id': orgId })
    .join('time_off_requests as t', { 'u.id': 't.user_id' })
  // .select(
  //   'u.id as user_id',
  //   'tor.id as time_off_request_id',
  //   'tor.date',
  //   'tor.reason',
  //   'tor.status'
  // )
  // .reduce((acc, current) => {
  //   const { user_id, time_off_request_id, date, reason, status } = current
  //   const newItem = { id: time_off_request_id, date, reason, status }
  //   console.log(current)

  //   if (acc[user_id]) {
  //     acc[user_id].push(newItem)
  //   } else {
  //     acc[user_id] = [newItem]
  //   }

  //   return acc
  // }, {})

  console.log('time off requests')
  console.log(timeOffRequests)

  // console.log('Employees:')
  // console.log(employees)
  // console.log(availabilities)

  const combined = employees.map(employee => {
    const { id } = employee

    if (availabilities[id]) {
      return { ...employee, availabilities: [...availabilities[id]] }
    } else {
      return { ...employee, availabilities: [] }
    }
  })

  // console.log(combined)

  return combined
}

module.exports = {
  getEmployees
}
