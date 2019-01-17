const express = require('express')
const router = express.Router()
const {
  getTimeOffRequests,
  addTimeOffRequest,
  updateTimeOffRequest,
  deleteTimeOffRequest,
  getTimeOffRequestsForOrg,
  getTimeOffRequest
} = require('../../database/helpers')

//get time off request
router.get('/:id', (req, res) => {
  const { id } = req.params
  getTimeOffRequests(id)
    .then(request => res.status(200).json(request))
    .catch(err =>
      res.status(404).json({ message: 'Error getting time off requests', err })
    )
})

//add time off request
router.post('/:id', (req, res) => {
  const { id } = req.params
  const { date, reason } = req.body
  if (!date || !reason)
    return res.status(400).json({ error: 'Missing required field(s)' })

  addTimeOffRequest({ user_id: id, date, reason, status: 'pending' })
    .then(request => res.status(200).json(request))
    .catch(err => {
      console.log(err)
      res.status(404).json({ err: 'Error with request', err })
    })
})

//update time off request
router.put('/:id', (req, res) => {
  const { id } = req.params
  // const { status } = req.body

  updateTimeOffRequest(id, req.body)
    .then(result => {
      console.log(result)
      return getTimeOffRequest(id)
    })
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      return res
        .status(404)
        .json({ err: 'Error getting time off requests', err })
    })
})

//delete time off request
router.delete('/:id', (req, res) => {
  const { id } = req.params
  deleteTimeOffRequest(id)
    .then(res => res.status(200).json(res))
    .catch(err => res.status(404).json({ err: 'Error deleting request', err }))
})

router.get('/', (req, res) => {
  getTimeOffRequestsForOrg()
    .then(res => res.status(200).json(res))
    .catch(err =>
      res.status(404).json({ err: 'Error getting time off requests', err })
    )
})

module.exports = router
