import moment from 'moment'

export function getHoursOfOperationRange(hours) {
  let firstDay = hours.find(day => !day.closed)
  let numRange =
    !hours.length || !firstDay
      ? // make sure hours of operation have been received and there is
        // an open day, otherwise do full day range
        { min: 0, max: 24 }
      : hours.reduce(
          (acc, day) => {
            let returnVal = { ...acc }
            const dayStart = day.open_time
            const dayEnd = day.close_time

            if (day.closed) {
              return returnVal
            }
            if (dayStart < acc.min) {
              returnVal.min = dayStart
            }
            if (dayEnd > acc.max) {
              returnVal.max = dayEnd
            }
            return returnVal
          },
          {
            min: hours[0].open_time,
            max: hours[0].close_time
          }
        )
  let today = new Date()

  // return a min/max object with dates, as expected by react-big-calendar
  return {
    min: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      Math.floor(numRange.min)
    ),
    max: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      Math.ceil(numRange.max) - 1,
      59
    )
  }
}

export const formatHours = hours => {
  if (hours === 24) {
  }
  const hoursInt = hours === 24 ? 23 : Math.floor(hours)
  const minutesInt = hours === 24 ? 59 : Math.floor((hours - hoursInt) * 60)
  return moment({ hours: hoursInt, minutes: minutesInt }).format('h:mm a')
}

export const getRange = ({ date, view }) => {
  if (view === 'day') {
    return [date]
  } else {
    let range = []
    let inc = 1000 * 60 * 60 * 24
    let amount = 7
    let weekStart = moment(date).startOf('week')
    for (let i = 0; i < amount; i++) {
      range.push(new Date(weekStart + i * inc))
    }
    return range
  }
}

// helpers for calculateCoverage

// UTILS:
// converts a moment into float
export const convertMomentToFloat = time =>
  moment(time).hours() + moment(time).minutes() / 60

// converts a float into an object with hours and minutes
const convertFloatToTime = num => {
  const [hours, fraction] = num.toString().split('.')
  const minutes = parseInt((60 * (fraction / 10)).toString().slice(0, 2)) || 0
  return [hours, minutes]
}

export const calculateCoverage = ({ hours, employees, view, date }) => {
  // combine all shifts into a single array
  const shifts = employees.reduce((acc, { events }) => [...acc, ...events], [])

  // console.log(view)
  // console.log(date)
  // console.log(shifts)

  // initialize an object keyed by all open days on the schedule
  const days = hours.reduce(
    (acc, { day, closed }) => (!closed ? { ...acc, [day]: [] } : { ...acc }),
    {}
  )

  // populate days object with all corresponding shifts
  shifts.forEach(shift => {
    const shiftDay = moment(shift.start)
      .subtract(5, 'hours')
      .day()
    console.log('DAY INFO')
    console.log(
      moment(shift.start)
        .subtract(5, 'hours')
        .toISOString()
    )
    console.log(`day of the week: ${shiftDay}`)
    if (days[shiftDay]) {
      days[shiftDay].push(shift)
    }
  })

  console.log('DAYS')
  console.log(days)

  // initialize covered and open hours variables
  let totalHoursCovered = 0
  let totalHoursOpen = 0

  // for each day add number of covered and open hours
  Object.keys(days).forEach(key => {
    console.log(`Generating hours for ${key}`)
    // sort shifts by start time
    const sortedShifts = days[key].sort((a, b) =>
      moment(a.start).isAfter(b.start)
    )

    console.log('SORTED SHIFTS:')
    console.log(sortedShifts)

    // merge shifts
    // take shifts and combine them into blocks of time
    const mergedShifts = sortedShifts.reduce((acc, { start, end }) => {
      if (!acc.length) {
        // start by initializing with first shift
        return [{ start, end }]
      } else {
        if (moment(start).isAfter(acc[acc.length - 1].end)) {
          // if shifts are not overlapping
          return [...acc, { start, end }]
        } else if (moment(end).isBefore(acc[acc.length - 1].end)) {
          // if new shift exists within previous block
          return [...acc]
        } else {
          // if we need to replace last block with a combined block
          return [
            ...acc.slice(0, acc.length - 1),
            { start: acc[acc.length - 1].start, end }
          ]
        }
      }
    }, [])

    console.log('MERGED SHIFTS')
    console.log(mergedShifts)

    // truncate merged shifts to only open hours
    const truncatedShifts = mergedShifts.reduce((acc, { start, end }) => {
      // if schedule end is before shift start, discard shift
      // if schedule start is after shift end, discard shift
      // if shift start is before schedule start, truncate shift start
      // if shift end is after end, trucate shift end
      // otherwise do nothing

      // convert times to floats
      const shiftStartFloat = convertMomentToFloat(start)
      const shiftEndFloat = convertMomentToFloat(end)

      console.log(`schedule start time: ${hours[key].open_time}`)
      console.log(`schedule end time: ${hours[key].close_time}`)
      console.log(`shift start time: ${shiftStartFloat}`)
      console.log(`shift end time: ${shiftEndFloat}`)

      // run discard options first, then mutation options to make sure discards happen
      if (hours[key].close_time < shiftStartFloat) {
        // discard shift
        console.log('discarding shift')
        return [...acc]
      } else if (hours[key].open_time > shiftEndFloat) {
        // discard shift
        console.log('discarding shift')
        return [...acc]
      } else if (shiftStartFloat < hours[key].open_time) {
        // truncate start
        console.log('truncating start')
        const diff = hours[key].open_time - shiftStartFloat
        const [hoursDiff, minutesDiff] = convertFloatToTime(diff)

        const newStart = moment(start)
          .add(hoursDiff, 'hours')
          .add(minutesDiff, 'minutes')
          .toISOString()

        return [...acc.slice(0, acc.length - 1), { start: newStart, end }]
      } else if (shiftEndFloat > hours[key].close_time) {
        // truncate end
        console.log('truncating end')
        const diff = shiftEndFloat - hours[key].close_time
        const [hoursDiff, minutesDiff] = convertFloatToTime(diff)

        const newEnd = moment(end)
          .subtract(hoursDiff, 'hours')
          .subtract(minutesDiff, 'minutes')
          .toISOString()

        return [...acc.slice(0, acc.length - 1), { start, end: newEnd }]
      } else {
        // otherwise do nothing
        return [...acc, { start, end }]
      }
    }, [])

    console.log('TRUNCATED SHIFTS:')
    console.log(truncatedShifts)

    // calculate shift coverage in hours
    const hoursCovered = truncatedShifts.reduce((acc, { start, end }) => {
      return acc + moment.duration(moment(end).diff(start)).asHours()
    }, 0)

    console.log('HOURS COVERED:')
    console.log(hoursCovered)

    // calculate hours open
    const hoursOpen = hours[key].close_time - hours[key].open_time

    // increment the weekly totals accordingly
    totalHoursCovered += hoursCovered
    totalHoursOpen += hoursOpen
  })

  // calculate percentage
  const percentCoverage = Math.floor((totalHoursCovered / totalHoursOpen) * 100)

  return percentCoverage
}

export const validateShift = ({ eventTimes, hours, employee }) => {
  // step 1
  // check for conflicts with approved day off requests
  let conflicts = false

  employee.time_off_requests.forEach(({ date, status }) => {
    if (status === 'approved' && moment(eventTimes.start).isSame(date, 'day')) {
      conflicts = true
    }
  })

  if (conflicts) {
    return {
      verdict: false,
      message: `Sorry, you can't schedule this employee during their approved time off.`
    }
  }

  // step 2
  // check for the event falling inside an availability window
  const availabilityForDay =
    employee.availabilities.filter(
      ({ day }) => day === moment(eventTimes.start).day()
    )[0] || null

  if (!availabilityForDay) {
    return {
      verdict: false,
      message: `Sorry, the employee you're trying to schedule isn't available on this day.`
    }
  }

  if (
    // day cannot have an off property of true
    availabilityForDay.off ||
    // start time must be earlier than or the same as eventTimes.start
    !(availabilityForDay.start_time <= moment(eventTimes.start).hour()) ||
    // end_time must be later than or the same as eventTimes.end
    !(availabilityForDay.end_time >= moment(eventTimes.end).hour())
  ) {
    return {
      verdict: false,
      message: `Sorry, you can't schedule this employee outside their availability window.`
    }
  }

  // step 3
  // check for event falling outside hours of operation
  const day = moment(eventTimes.start).day()

  if (
    convertMomentToFloat(eventTimes.start) < hours[day].open_time ||
    convertMomentToFloat(eventTimes.end) > hours[day].close_time
  ) {
    return {
      verdict: false,
      message: `Sorry, you can't schedule this employee outside the hours of operation.`
    }
  }

  // step 4
  // check for scheduling the same employee twice during the same block of time
  employee.events.forEach(({ start, end }) => {
    // possible collisions: if event start or end exists between start/end of existsing event
    if (
      (moment(eventTimes.start).isAfter(start) &&
        moment(eventTimes.start).isBefore(end)) ||
      (moment(eventTimes.end).isAfter(start) &&
        moment(eventTimes.end).isBefore(end))
    ) {
      conflicts = true
    }
  })

  // need to keep this separate because returning from forEach doesn't escape the enclosing func
  if (conflicts) {
    return {
      verdict: false,
      message: `Sorry, you can't schedule this employee twice during the same block of time.`
    }
  }

  // if everything went okay
  return { verdict: true }
}

// slider time helpers
export const minuteToTime = (value, format = 12) => {
  value = value > 1439 ? 1439 : value
  let hours = Math.floor(value / 60),
    minutes = value - hours * 60,
    ampm

  // if (hours.length === 1) hours = '0' + hours
  // if (minutes.length === 1) minutes = '0' + minutes
  // if (minutes === 0) minutes = '00'
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

export const utcTimeToLocalDate = utcString => {
  const offset = new Date().getTimezoneOffset()
  const dateNaive = moment.utc(utcString, 'HH:mm')
  const hours = dateNaive.hours()
  const minutes = dateNaive.minutes()
  const totalMinutes = hours * 60 + minutes
  if (totalMinutes > offset) {
    return dateNaive.local().format()
  } else {
    return dateNaive
      .add(1, 'day')
      .local()
      .format()
  }
}
