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
  getTimeOffRequests()
    .then(request => res.status(200).json(request))
    .catch(err =>
      res.status(404).json({ err: 'Error getting time off requests', err })
    )
})

router.post('/', (req, res) => {
  const { date, reason, status } = req.body

  if (!date || !reason || !status)
    res.status(400).json({ error: 'Missing required field(s)', err })

  addTimeOffRequest()
    .then(request => res.status(200).json(request))
    .catch(err => res.status(404).json({ err: 'Error with request', err }))
})

router.put('/:id', (req, res) => {
  const { id } = req.params

  if (!Object.keys(req.body)) {
    res.status(400).json({ error: 'No fields provided to update', err })
  }

  updateTimeOffRequest(id)
    .then(request => res.status(200).json(request))
    .catch(err =>
      res.status(404).json({ err: 'Error getting time off requests', err })
    )
})
router.delete('/:id', (req, res) => {
  const { id } = req.params
  deleteTimeOffRequest(id)
    .then(request => res.status(200).json(request))
    .catch(err => res.status(404).json({ err: 'Error deleting request', err }))
})

router.get('/', (req, res) => {
  getTimeOffRequestsForOrg()
    .then(request => res.status(200).json(request))
    .catch(err =>
      res.status(404).json({ err: 'Error getting time off requests', err })
    )
})

module.exports = router
