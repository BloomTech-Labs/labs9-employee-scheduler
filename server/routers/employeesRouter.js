const express = require('express')
const router = express.Router()
const { getEmployees } = require('../../database/helpers')
const {
  demoUsers,
  demoAvailabilities,
  demoTimeOff,
  initDemo
} = require('../../database/utils/demoUsers')
const knex = require('../../database/dbConfig')

const authorize = require('../config/customMiddleware/authorize')

// what are the relevant routes here?
// get all employees (includes time off info, etc)

// this needs to be authorized for all so when an employee is logged in the calendar on the dashboard will get events
router.get('/:id', authorize(['all']), (req, res) => {
  const { id } = req.params
  // id is org id
  getEmployees(id)
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.log(err)
      res.status(404).json(err)
    })
})

// this post router creates fake demo employees
router.post('/:id', authorize(['owner', 'supervisor']), (req, res) => {
  const { id } = req.params
  const { offset } = req.body
  // id is org id
  const users = demoUsers(id)
  const availabilities = demoAvailabilities(users, offset)
  const timeOffRequests = demoTimeOff(users, offset)

  initDemo({ users, availabilities, timeOffRequests }, knex)
    .then(users => res.status(201).json(users))
    .catch(err => {
      console.log(err)
      res.status(400).json(err)
    })
})

module.exports = router
