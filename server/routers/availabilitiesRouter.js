const express = require('express')
const router = express.Router()
const {
  getAvailabilities,
  addAvailability,
  updateAvailability,
  deleteAvailability,
  getUser
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

//how do we get the availability id out of req.body?
router.put('/:id', authorize(['all']), (req, res) => {
  const { id } = req.body
  const updates = req.body
  console.log('updates--', updates, 'id--', req.p)
  updateAvailability(id, req.body)
    .then(days => res.status(200).json(days))
    .catch(err => res.status(404).json(err))
})

// delete availability takes in availability id and deletes
router.delete('/:id', authorize(['all']), (req, res) => {
  const { id } = req.params
  deleteAvailability(id)
    .then(count => res.status(200).json(count))
    .catch(err => res.status(404).json(err))
})

module.exports = router
