import moment from 'moment'

export const formatHours = hours => {
  return moment
    .utc(hours, 'HH:mm')
    .local()
    .format('h:mm a')
}

const inRolloverZone = startTime => {
  const offset = Math.abs(moment().utcOffset())
  const date = moment(startTime, 'HH:mm')
  return date.hours() * 60 + date.minutes() < offset
}

// decrements a day by one, and wraps around to 6 for -1
const decrementDay = day => {
  const candidate = day - 1
  return candidate < 0 ? candidate + 7 : candidate
}

export const utcDayToLocal = ({ day, time }) => {
  return inRolloverZone(time) ? decrementDay(day) : day
}

export const localDayToUTC = ({ day, utcTime }) => {
  return inRolloverZone(utcTime) ? day + 1 : day
}

export const minuteToTime = (value, format = 12) => {
  value = value > 1439 ? 1439 : value
  let hours = Math.floor(value / 60),
    minutes = value - hours * 60,
    ampm
  if (format === 12) {
    ampm = 'AM'
    if (hours >= 12) {
      if (hours !== 12) {
        hours = hours - 12
      }
      ampm = 'PM'
    }
    if (hours === 0) {
      hours = 12
    }
  }

  return { hours: hours, minutes: minutes, am_pm: ampm }
}

export const timeToMinute = (time, format = 12) => {
  let rMinutes = 1439
  if (format === 24) {
    time = time.split(':')
    if (time.length < 2) {
      throw new Error('Invalid time')
    }
    let hours = time[0],
      minutes = parseInt(time[1])
    hours = parseInt(hours * 60)
    rMinutes = hours + minutes
  } else {
    time = time.toUpperCase()
    time = time.replace(' ', '')
    let ampm = time.indexOf('AM') !== -1 ? 'AM' : 'PM'
    time = time.replace(ampm, '')
    time = time.split(':')
    if (time.length < 2) {
      throw new Error('Invalid time')
    }
    let hours = parseInt(time[0]),
      minutes = parseInt(time[1])
    if (ampm === 'PM') {
      if (hours !== 12) {
        hours = hours + 12
      }
    } else {
      hours = hours === 12 ? 0 : hours
    }
    hours = hours * 60
    rMinutes = hours + minutes
  }
  return rMinutes > 1439 ? 1439 : rMinutes
}

// deprecate?
export const convertMomentToFloat = time =>
  moment(time).hours() + moment(time).minutes() / 60

// deprecate?
// converts a float into an object with hours and minutes
const convertFloatToTime = num => {
  const [hours, fraction] = num.toString().split('.')
  const minutes = parseInt((60 * (fraction / 10)).toString().slice(0, 2)) || 0
  return [hours, minutes]
}
