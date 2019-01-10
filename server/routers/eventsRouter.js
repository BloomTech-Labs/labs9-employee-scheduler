const express = require('express')
const router = express.Router()
const {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  getEventsForOrg
} = require('../../database/helpers')

router.get('/', (req, res) => {
  getEvents()
    .then(events => res.status(200).json(events))
    .catch(err => res.status(404).json(err))
})

router.post('/', async (req, res) => {
  const { user_id, day, start_time, end_time } = req.body
  if (!user_id || !day || !start_time || !end_time) {
    res.status(400).json({ error: 'Missing required field(s)' })
  }
  try {
    const success = await addEvent(req.body)
    res.status(201).json(success)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' })
  }
})

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
router.delete('/:id', async (req, res) => {
  const { id } = req.params
})

module.exports = router
