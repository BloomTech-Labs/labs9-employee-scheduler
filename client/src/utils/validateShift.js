import moment from 'moment'

export const validateShift = ({ eventTimes, hours, employee, eventId }) => {
  // step 1: check for conflicts with approved day off requests
  let conflicts = false

  employee.time_off_requests.forEach(({ start, end, status }) => {
    if (
      status === 'approved' &&
      (moment(start).isBetween(eventTimes.start, eventTimes.end) ||
        moment(end).isBetween(eventTimes.start, eventTimes.end))
    ) {
      conflicts = true
    }
  })

  if (conflicts) {
    return {
      verdict: false,
      message: `Sorry, you can't schedule this employee during their approved time off.`
    }
  }

  // step 2: check for the event falling inside an availability window
  const availabilityForDay = employee.availabilities.find(
    ({ day }) =>
      day ===
      moment(eventTimes.start)
        .utc()
        .day()
  )

  if (!availabilityForDay.off) {
    const convertTimeToObject = time => {
      const [hour, minute] = time.split(':')
      return { hour, minute, second: '00' }
    }

    let start = moment(eventTimes.start)
      .utc()
      .set(convertTimeToObject(availabilityForDay.start_time))
    let end = moment(eventTimes.start)
      .utc()
      .set(convertTimeToObject(availabilityForDay.end_time))

    if (moment(end).isBefore(start)) {
      end = end.add(1, 'days')
    }

    if (
      moment(start).isAfter(eventTimes.start) ||
      moment(end).isBefore(eventTimes.end)
    ) {
      return {
        verdict: false,
        message: `Sorry, you can't schedule this employee outside their availability window.`
      }
    }
  } else {
    return {
      verdict: false,
      message: `Sorry, the employee you're trying to schedule isn't available on this day.`
    }
  }

  // step 3: check for event falling outside hours of operation
  const day = moment(eventTimes.start)
    .utc()
    .day()

  if (hours[day].closed) {
    return {
      verdict: false,
      message: `Sorry, you can't schedule this employee outside the hours of operation.`
    }
  }

  const convertTimeToObject = time => {
    const [hour, minute] = time.split(':')
    return { hour, minute, second: '00' }
  }

  let scheduleStart = moment(eventTimes.start)
    .utc()
    .set(convertTimeToObject(hours[day].open_time))
  let scheduleEnd = moment(eventTimes.start)
    .utc()
    .set(convertTimeToObject(hours[day].close_time))

  if (moment(scheduleEnd).isBefore(scheduleStart)) {
    scheduleEnd = scheduleEnd.add(1, 'days')
  }

  if (
    !moment(eventTimes.start).isBetween(
      scheduleStart,
      scheduleEnd,
      'minute',
      [] /*inclusive*/
    ) ||
    !moment(eventTimes.end).isBetween(
      scheduleStart,
      scheduleEnd,
      'minute',
      [] /*inclusive*/
    )
  ) {
    return {
      verdict: false,
      message: `Sorry, you can't schedule this employee outside the hours of operation.`
    }
  }

  // step 4: check for scheduling the same employee twice during the same block of time
  employee.events.forEach(({ start, end, id }) => {
    // make sure not to test for the event colliding with itself
    // possible collisions: if event start or end exists between start/end of existing event
    if (
      eventId !== id &&
      ((moment(eventTimes.start).isAfter(start) &&
        moment(eventTimes.start).isBefore(end)) ||
        (moment(eventTimes.end).isAfter(start) &&
          moment(eventTimes.end).isBefore(end)))
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
