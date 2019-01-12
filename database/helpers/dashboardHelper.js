const db = require('../dbConfig')

const getDashboard = async userId => {
  const user = await db('users as u')
    .where({ 'u.id': userId })
    .select('u.id', 'u.first_name', 'u.last_name')

  const shifts = await db('users as u')
    .where({ 'u.id': userId })
    .join('events as e', { 'u.id': 'e.user_id' })
    .select('e.id', 'e.day', 'e.start_time', 'e.end_time')
    .reduce((acc, { id, day, start_time, end_time }) => {
      const weekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
      // do a little clever formatting with the date formatting
      // depending on calendar api this might change later
      return [
        ...acc,
        { id, day: weekdays[day], time: `${start_time}am-${end_time - 12}pm` }
      ]
    }, [])

  const timeOff = await db('users as u')
    .where({ 'u.id': userId })
    .join('time_off_requests as tor', { 'u.id': 'tor.user_id' })
    .select('tor.id', 'tor.date', 'tor.status', 'tor.reason')
    .reduce((acc, { id, date, status, reason }) => {
      // return only confirmed time off
      return status === 'confirmed'
        ? [...acc, { id, date, status, reason }]
        : acc
    }, [])

  return {
    ...user[0],
    shifts: shifts ? [...shifts] : [],
    time_off: timeOff ? [...timeOff] : []
  }
}

module.exports = {
  getDashboard
}
