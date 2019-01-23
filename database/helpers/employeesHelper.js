const db = require('../dbConfig')

const getEmployees = async orgId => {
  // For the get employees route, we need to return all users for a given org
  // in addition, these employees also need to have the following info:
  // availabilities and time off requests

  // as there are three tables that we need to query and then crunch that data for
  // this gets a bit complicated. In order to manage the complexity a little bit,
  // I divided the query up into three, that then get compiled together.

  // First, grab all the employees for a given org
  const employeesP = db('users as u').where({ 'u.organization_id': orgId })

  // Second, grab the availabilities for each employee and crunch the data together
  // into an object of key value pairs where each key is a user id and the value
  // is an array of the availabilities for that user
  const availabilitiesP = db('users as u')
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

  // Third, grab the time off requests for each employee. The data is crunched in
  // the same way: key value pairs where each key is a user id and the value
  // is an array of the time off requests for that user
  const timeOffRequestsP = db('users as u')
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

  // do the same as above with events
  const eventsP = db('users as u')
    .where({ 'u.organization_id': orgId })
    .join('events as e', { 'u.id': 'e.user_id' })
    .select('u.id as user_id', 'start', 'end', 'e.id')
    .reduce((acc, current) => {
      const { user_id } = current
      // const newItem = { id: time_off_request_id, date, reason, status }

      if (acc[user_id]) {
        acc[user_id].push(current)
      } else {
        acc[user_id] = [current]
      }

      return acc
    }, {})

  // await for all async actions to finish
  const [
    events,
    employees,
    availabilities,
    timeOffRequests
  ] = await Promise.all([
    eventsP,
    employeesP,
    availabilitiesP,
    timeOffRequestsP
  ])

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
  getEmployees
}
