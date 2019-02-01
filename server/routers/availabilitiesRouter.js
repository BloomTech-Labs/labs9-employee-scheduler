const express = require('express')
const router = express.Router()
const {
  getAvailabilities,
  updateAvailability,
  getUser,
  getAvailability
} = require('../../database/helpers')

const authorize = require('../config/customMiddleware/authorize')

// getAvailability, takes in user id
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

// updateAvailability, takes in availibility Id, and updates
router.put('/:id', authorize(['all']), async (req, res) => {
  const { id } = req.params
  const updates = req.body

  try {
    const numberUpdated = await updateAvailability(id, updates)
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

module.exports = router
