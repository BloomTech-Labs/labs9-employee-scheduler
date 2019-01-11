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
      const newItem = { id: availability_id, day, start_time, end_time }

      if (acc[user_id]) {
        acc[user_id].push(newItem)
      } else {
        acc[user_id] = [newItem]
      }

      return acc
    }, {})

  const timeOffRequests = await db('users as u')
    .where({ 'u.organization_id': orgId })
    .join('time_off_requests as tor', { 'u.id': 'tor.user_id' })
    .select(
      'u.id as user_id',
      'tor.id as time_off_request_id',
      'tor.date',
      'tor.reason',
      'tor.status'
    )
    .reduce((acc, current) => {
      const { user_id, time_off_request_id, date, reason, status } = current
      const newItem = { id: time_off_request_id, date, reason, status }

      if (acc[user_id]) {
        acc[user_id].push(newItem)
      } else {
        acc[user_id] = [newItem]
      }

      return acc
    }, {})

  const combined = employees.map(employee => {
    const { id } = employee

    return {
      ...employee,
      availabilities: availabilities[id] ? [...availabilities[id]] : [],
      time_off_requests: timeOffRequests[id] ? [...timeOffRequests[id]] : []
    }
  })

  return combined
}

module.exports = {
  getEmployees
}
