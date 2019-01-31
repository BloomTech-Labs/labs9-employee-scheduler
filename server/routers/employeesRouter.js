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

router.get('/:id', authorize(['owner', 'supervisor']), (req, res) => {
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
  // id is org id
  const users = demoUsers(id)
  const availabilities = demoAvailabilities(users)
  const timeOffRequests = demoTimeOff(users)

  // UNCOMMMENT THIS once first-time bools and redux are set up
  // initDemo({ users, availabilities, timeOffRequests }, knex)
  //   .then(users => res.status(201).json(users))
  //   .catch(err => {
  //     console.log(err)
  //     res.status(400).json(err)
  //   })
})

module.exports = router
