const express = require('express')
const router = express.Router()
const {
  getUsers,
  addUser,
  updateUser,
  deleteUser
} = require('../../database/helpers')

router.get('/', (req, res) => {
  getUsers()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(404).json(err))
})

router.get('/:id', (req, res) => {
  getUsers(id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json(err))
})

// this one depends on auth. We'll build it later
router.get('/current', (req, res) => {}) // get info for current user

router.post('/:id', async (req, res) => {
  const { organization_id, first_name, last_name, role } = req.body
  const { id } = req.params

  if (!organization_id || !first_name || !last_name || !role) {
    res.status(400).json({ error: 'Missing required field(s)' })
  }

  try {
    const success = await addUser(id, req.body)
    res.status(201).json(success)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/', async (req, res) => {
  const { id } = req.params

  if (!Object.keys(req.body)) {
    res.status(400).json({ error: 'No fields provided to update' })
  }

  try {
    const success = await updateUser(id, req.body)
    res.status(200).json(success)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' })
  }
})

router.delete('/', async (req, res) => {
  const { id } = req.params

  try {
    const success = await deleteUser(id)
    res.status(200).json(success)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router
