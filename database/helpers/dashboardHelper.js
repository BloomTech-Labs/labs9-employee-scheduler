const db = require('../dbConfig')
const moment = require('moment')

const getDashboard = async userId => {
  const user = await db('users as u')
    .where({ 'u.id': userId })
    .select('u.id', 'u.first_name', 'u.last_name')

  const availabilities = await db('users as u')
    .where({ 'u.id': userId })
    .join('availabilities as a', { 'u.id': 'a.user_id' })
    .select('a.id', 'a.day', 'a.off', 'a.start_time', 'a.end_time')
    .reduce((acc, { id, day, off, start_time, end_time }) => {
      // do a little clever formatting with the date formatting
      // depending on calendar api this might change later
      return [...acc, { id, day, off, start_time, end_time }]
    }, [])

  const shifts = await db('users as u')
    .where({ 'u.id': userId })
    .join('events as e', { 'u.id': 'e.user_id' })
    .select('e.id', 'e.start', 'e.end')
    .reduce((acc, { id, start, end }) => {
      // do a little clever formatting with the date formatting
      // depending on calendar api this might change later
      return [...acc, { id, start, end }]
    }, [])

  const timeOff = await db('users as u')
    .where({ 'u.id': userId })
    .join('time_off_requests as tor', { 'u.id': 'tor.user_id' })
    .select('tor.id', 'tor.date', 'tor.status', 'tor.reason')
    .reduce((acc, { id, date, status, reason }) => {
      // return only confirmed time off
      // TODO: this logic needs to be reworked to see denied requests for only 2 days.

      // let twoDays = moment(date).diff(Date.now(), 'day')
      // this will check if the denied request is older than two days
      // and hide it from employee view so that it doesn't build up
      return date ? [...acc, { id, date, status, reason }] : acc
    }, [])

  return {
    ...user[0],
    availabilities: availabilities ? [...availabilities] : [],
    shifts: shifts ? [...shifts] : [],
    time_off: timeOff ? [...timeOff] : []
  }
}

module.exports = {
  getDashboard
}
