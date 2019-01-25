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

export const formatHours = hours =>
  moment({ hours })
    .format('h:mm a')
    .replace(/$0:/, '12:')

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
const convertMomentToFloat = time =>
  moment(time).hours() + moment(time).minutes() / 60

// converts a float into an object with hours and minutes
const convertFloatToTime = num => {
  const [hours, fraction] = num.toString().split('.')
  const minutes = parseInt((60 * (fraction / 10)).toString().slice(0, 2)) || 0
  return [hours, minutes]
}

export const calculateCoverage = ({ hours, employees }) => {
  // combine all shifts into a single array
  const shifts = employees.reduce((acc, { events }) => [...acc, ...events], [])

  // initialize an object keyed by all open days on the schedule
  const days = hours.reduce(
    (acc, { day, closed }) => (!closed ? { ...acc, [day]: [] } : { ...acc }),
    {}
  )

  // populate days object with all corresponding shifts
  shifts.forEach(shift => {
    const shiftDay = moment(shift.start).day()
    if (days[shiftDay]) {
      days[shiftDay].push(shift)
    }
  })

  // initialize covered and open hours variables
  let totalHoursCovered = 0
  let totalHoursOpen = 0

  // for each day add number of covered and open hours
  Object.keys(days).forEach(key => {
    // sort shifts by start time
    const sortedShifts = days[key].sort((a, b) =>
      moment(a.start).isAfter(b.start)
    )

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

      // run discard options first, then mutation options to make sure discards happen
      if (hours[key].close_time < shiftStartFloat) {
        // discard shift
        return [...acc]
      } else if (hours[key].open_time > shiftEndFloat) {
        // discard shift
        return [...acc]
      } else if (shiftStartFloat < hours[key].open_time) {
        // truncate start
        const diff = hours[key].open_time - shiftStartFloat
        const [hoursDiff, minutesDiff] = convertFloatToTime(diff)

        const newStart = moment(start)
          .add(hoursDiff, 'hours')
          .add(minutesDiff, 'minutes')
          .toISOString()

        return [...acc.slice(0, acc.length - 1), { start: newStart, end }]
      } else if (shiftEndFloat > hours[key].close_time) {
        // truncate end
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

    // calculate shift coverage in hours
    const hoursCovered = truncatedShifts.reduce((acc, { start, end }) => {
      return acc + moment.duration(moment(end).diff(start)).asHours()
    }, 0)

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
    window.alert(
      `Sorry, you can't schedule this employee during their approved time off.`
    )
    return false
  }

  // step 2
  // check for the event falling inside an availability window
  const availabilityForDay =
    employee.availabilities.filter(
      ({ day }) => day === moment(eventTimes.start).day()
    )[0] || null

  if (!availabilityForDay) {
    window.alert(
      `Sorry, the employee you're trying to schedule isn't available on this day.`
    )
    return false
  }

  // start time must be earlier than or the same as eventTimes.start
  // end_time must be later than or the same as eventTimes.end
  if (
    !(availabilityForDay.start_time <= moment(eventTimes.start).hour()) ||
    !(availabilityForDay.end_time >= moment(eventTimes.end).hour())
  ) {
    window.alert(
      `Sorry, you can't schedule this employee outside their availability window.`
    )
    return false
  }

  // step 3
  // check for event falling outside hours of operation
  const day = moment(eventTimes.start).day()

  if (
    convertMomentToFloat(eventTimes.start) < hours[day].open_time ||
    convertMomentToFloat(eventTimes.end) > hours[day].close_time
  ) {
    window.alert(
      `Sorry, you can't schedule this employee outside the hours of operation.`
    )
    return false
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
    window.alert(
      `Sorry, you can't schedule this employee twice during the same block of time.`
    )
    return false
  }

  // if everything went okay
  return true
}
