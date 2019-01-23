const express = require('express')
const router = express.Router()
const {
  getAvailabilities,
  addAvailability,
  updateAvailability,
  deleteAvailability,
  getUser,
  getAvailability
} = require('../../database/helpers')

const authorize = require('../config/customMiddleware/authorize')

// getAvailability, takes in user id and constraints object (start, end itmes)
router.get('/:id', authorize(['all']), (req, res) => {
  const { id } = req.params
  const { constraints } = req.body
  getAvailabilities(id, constraints)
    .then(async users => {
      if (users.length) {
        return res.status(200).json(users)
      }
      const user = await getUser(id)
      if (user) {
        return res.status(200).json(users)
      } else {
        return res.status(404).json({ message: 'User does not exist' })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// addAvailability, takes in a user id and a day (week day)
router.post('/:id', authorize(['all']), (req, res) => {
  const { id } = req.params
  const { day } = req.body
  addAvailability(id, day)
    .then(day => res.status(201).json(day))
    .catch(err => res.status(404).json(err))
})

// updateAvailability, takes in availibility Id, and updates

router.put('/:id', authorize(['all']), async (req, res) => {
  const { id } = req.params
  const updates = req.body
  try {
    const numberUpdated = await updateAvailability(id, req.body)
    if (numberUpdated > 0) {
      const updated = await getAvailability(id)
      return res.status(200).send(updated)
    } else {
      return res.status(404).json({ message: 'id not found' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

// delete availability takes in availability id and deletes
router.delete('/:id', authorize(['all']), (req, res) => {
  const { id } = req.params
  deleteAvailability(id)
    .then(count => res.status(200).json(count))
    .catch(err => res.status(404).json(err))
})

module.exports = router
