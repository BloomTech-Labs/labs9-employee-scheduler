const express = require('express')
const router = express.Router()
const {
  getEvents,
  getEvent,
  addEvent,
  updateEvent,
  deleteEvent,
  getEventsForOrg
} = require('../../database/helpers')

// this route needs a userID to give back the associated events
router.get('/:id', (req, res) => {
  getEvents(req.params.id)
    .then(events => res.status(200).json(events))
    .catch(err => res.status(404).json(err))
})

// this route needs an orgID to give back associated events
router.get('/organization/:id', (req, res) => {
  getEventsForOrg(req.params.id)
    .then(events => res.status(200).json(events))
    .catch(err => res.status(404).json(err))
})

// this route allows you to post a new event for an associated user
router.post('/', async (req, res) => {
  const { user_id, start, end } = req.body
  if (!user_id || !start || !end) {
    res.status(400).json({ error: 'Missing required field(s)' })
  }
  try {
    const id = await addEvent(req.body)
    const event = await getEvent(id)
    res.status(201).json(event)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' })
  }
})

// this route enables you to edit an event by its id
router.put('/:id', async (req, res) => {
  const { id } = req.params
  if (!Object.keys(req.body)) {
    res.status(400).json({ error: 'No fields provided to update' })
  }
  try {
    const success = await updateEvent(id, req.body)
    res.status(200).json(success)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// this route enables you to delete an event by its id
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const success = await deleteEvent(id)
    res.status(200).json(success)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router
