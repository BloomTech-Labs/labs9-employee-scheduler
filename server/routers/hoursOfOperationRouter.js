const express = require('express')
const router = express.Router()

const {
  getHoursOfOperation,
  updateHoursOfOperation
} = require('../../database/helpers')

//gets the hours of operation by organization id
router.get('/:id', (req, res) => {
  getHoursOfOperation(req.params.id)
    .then(hours => res.status(200).json(hours))
    .catch(err => res.status(404).json(err))
})

//updates hours of operation by organization id
router.put('/:id', (req, res) => {
  const { id } = req.params
  updateHoursOfOperation(id, req.body)
    .then(hours => res.status(200).json(hours))
    .catch(err => res.status(500).json({ error: 'Server Error', err }))
})
module.exports = router
