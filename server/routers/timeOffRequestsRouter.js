const express = require('express')
const router = express.Router()
const {
  getTimeOffRequests,
  addTimeOffRequest,
  updateTimeOffRequest,
  deleteTimeOffRequest,
  getTimeOffRequestsForOrg
} = require('../../database/helpers')

router.get('/', (req, res) => {
  getUsers()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(404).json(err))
})

router.post('/', (req, res) => {})
router.put('/', (req, res) => {})
router.delete('/', (req, res) => {})

module.exports = router
