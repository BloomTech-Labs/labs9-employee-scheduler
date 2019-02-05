const moment = require('moment')

const sortByStartDate = events =>
  events.sort((a, b) => {
    if (moment(a.start).isAfter(b.start)) {
      return 1
    } else {
      return -1
    }
  })

const trimOldEvents = events =>
  events.filter(({ start }) => {
    if (
      moment()
        .startOf('day')
        .isAfter(start)
    ) {
      return false
    } else {
      return true
    }
  })

module.exports = { sortByStartDate, trimOldEvents }
