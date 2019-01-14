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
  paymentRouter
} = require('./routers/')

configureMiddleware(server)

server.get('/', (req, res) => res.status(200).json({ message: 'hello!' }))

server.use('/organizations', organizationsRouter)
server.use('/users', usersRouter)
server.use('/employees', employeesRouter)
server.use('/availabilities', availabilitiesRouter)
server.use('/time-off-requests', timeOffRequestsRouter)
server.use('/events', eventsRouter)
server.use('/dashboard', dashboardRouter)
server.use('/stripe', paymentRouter)

module.exports = server
