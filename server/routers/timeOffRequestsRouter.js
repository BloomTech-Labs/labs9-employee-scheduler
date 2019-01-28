const express = require('express')
const router = express.Router()
const {
  getTimeOffRequests,
  addTimeOffRequest,
  updateTimeOffRequest,
  deleteTimeOffRequest,
  getTimeOffRequest
} = require('../../database/helpers')

const authorize = require('../config/customMiddleware/authorize')

// get time off requests for user
router.get('/:userId', authorize(['all']), (req, res) => {
  const { userId } = req.params
  getTimeOffRequests(userId)
    .then(request => res.status(200).json(request))
    .catch(err =>
      res.status(404).json({ message: 'Error getting time off requests', err })
    )
})

//add time off request
router.post('/:userId', authorize(['all']), (req, res) => {
  const { userId } = req.params
  const { date, reason } = req.body
  if (!date || !reason)
    return res.status(400).json({ error: 'Missing required field(s)' })

  addTimeOffRequest({ user_id: userId, date, reason, status: 'pending' })
    .then(id => {
      return getTimeOffRequest(id)
    })
    .then(request => {
      if (request) {
        return res.status(200).json(request)
      } else {
        return res.status(500).json({ error: 'something went wrong' })
      }
    })
    .catch(err => {
      return res.status(404).json({ error: 'Error with request', err })
    })
})

//update time off request
router.put('/:id', authorize(['owner', 'supervisor']), (req, res) => {
  const { id } = req.params
  // const { status } = req.body
  updateTimeOffRequest(id, req.body)
    .then(result => {
      return getTimeOffRequest(id)
    })
    .then(result => res.status(200).json(result))
    .catch(err => {
      return res
        .status(404)
        .json({ error: 'Error getting time off requests', err })
    })
})

//delete time off request
router.delete('/:id', authorize(['owner', 'supervisor']), (req, res) => {
  const { id } = req.params
  deleteTimeOffRequest(id)
    .then(res => res.status(200).json(res))
    .catch(err =>
      res.status(404).json({ error: 'Error deleting request', err })
    )
})

// router.get('/', authorize(['owner', 'supervisor']), (req, res) => {
//   getTimeOffRequestsForOrg()
//     .then(res => res.status(200).json(res))
//     .catch(err =>
//       res.status(404).json({ error: 'Error getting time off requests', err })
//     )
// })

module.exports = router
