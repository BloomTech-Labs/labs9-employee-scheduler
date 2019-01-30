require('dotenv').config()
const server = require('./server.js')
const port = process.env.PORT || 9000

server.listen(port, () => console.log(`\n** server up on port ${port} **\n`))

// for testing

const moment = require('moment')

const day1 = moment('2019-01-30T16:00:00.000Z').day()

const day2 = moment('2019-01-31T00:00:00.000Z').day()

const day3 = moment('2019-01-31T07:00:00.000Z').day()

console.log(day1)
console.log(day2)
console.log(day3)

console.log(moment().utcOffset())
