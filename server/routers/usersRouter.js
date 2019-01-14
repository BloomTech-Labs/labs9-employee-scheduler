const express = require('express')
const router = express.Router()
const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser
} = require('../../database/helpers')

router.get('/', (req, res) => {
  getUsers()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(404).json(err))
})

// this one depends on auth.
router.post('/current', async (req, res) => {
  const { id } = req.user
  try {
    const user = await getUser(id)

    if (user) {
      return res.status(200).json(user)
    } else {
      return res.status(404).send({ message: 'User not found.' })
    }
  } catch (err) {
    return res.status(500).send()
  }
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  return getUsers(id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json(err))
})

router.post('/', async (req, res) => {
  const { organization_id, first_name, last_name, role } = req.body

  if (!organization_id || !first_name || !last_name || !role) {
    res.status(400).json({ error: 'Missing required field(s)' })
  }

  try {
    const success = await addUser(req.body)
    res.status(201).json(success)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params

  if (!Object.keys(req.body)) {
    return res.status(400).json({ error: 'No fields provided to update' })
  }

  const user = await getUser(id)
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  try {
    const success = await updateUser(id, req.body)
    res.status(200).json(success)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' })
  }
})

router.delete('/:id', async (req, res) => {
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
