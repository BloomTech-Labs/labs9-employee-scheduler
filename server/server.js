const express = require('express')
const configureMiddleware = require('./config/middleware.js')

const server = express()
const {
  organizationsRouter,
  usersRouter,
  availabilitiesRouter,
  timeOffRequestsRouter,
  eventsRouter,
  employeesRouter,
  dashboardRouter,
  paymentRouter,
  hoursOfOperationRouter
} = require('./routers/')

configureMiddleware(server)

server.get('/', (req, res) => {
  return res.status(200).json({ message: 'hello!' })
})

server.use('/organizations', organizationsRouter)
server.use('/users', usersRouter)
server.use('/employees', employeesRouter)
server.use('/availabilities', availabilitiesRouter)
server.use('/time-off-requests', timeOffRequestsRouter)
server.use('/events', eventsRouter)
server.use('/dashboard', dashboardRouter)
server.use('/stripe', paymentRouter)
// server.use('/hours-of-operation', hoursOfOperationRouter)

module.exports = server
