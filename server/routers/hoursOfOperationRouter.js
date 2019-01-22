const express = require('express')
const router = express.Router()

const {
  getHoursOfOperation,
  updateHoursOfOperation
} = require('../../database/helpers')

const authorize = require('../config/customMiddleware/authorize')

//gets the hours of operation by organization id
router.get('/:id', (req, res) => {
  console.log('router 13', req.params)
  const { id } = req.params
  getHoursOfOperation(id)
    .then(hours => {
      console.log(hours)
      return res.status(200).json(hours)
    })
    .catch(err => {
      console.log(err)
      return res.status(404).json(err)
    })
})

//updates hours of operation by hours id
router.put('/:id', authorize(['owner', 'supervisor']), (req, res) => {
  const { id } = req.params
  updateHoursOfOperation(id, req.body)
    .then(hours => res.status(200).json(hours))
    .catch(err => res.status(500).json({ error: 'Server Error', err }))
})

module.exports = router
