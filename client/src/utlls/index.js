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
