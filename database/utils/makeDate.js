const data = require('../static_seed.json').events
const fs = require('fs')

const today = new Date()
const year = today.getFullYear()
const month = today.getMonth()
const date = today.getDate()
const weekday = today.getDay()

const weekStart = date - weekday

const processed = data.map(({ day, start_time, end_time, ...rest }) => {
  const startDate = new Date(year, month, weekStart + day, start_time)

  const endDate = new Date(year, month, weekStart + day, end_time)

  return {
    ...rest,
    start: startDate,
    end: endDate
  }
})

fs.writeFile('updated.json', JSON.stringify({ events: processed }), console.log)
