const express = require('express')
const router = express.Router()
const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  addOrg
} = require('../../database/helpers')
const uuid = require('uuid/v4') // need here for optimizing creation of org with owner

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

// get all users for org by org id
router.get('/org/:id', async (req, res) => {
  const { id } = req.params
  getUsers(id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json(err))
})

// get single user by user id
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const user = await getUser(id)

    if (user) {
      return res.status(200).json(user)
    } else {
      return res.status(404).send({ message: 'User not found.' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send()
  }
})

// we need two separate post routes here:
// one for employees (incl supervisors) and one for owners
// i'll leave the generic post here for now

// generic post leaving for now
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

// post owner and org
router.post('/register/owner', async (req, res) => {
  // grab user id from client which is from firebase auth
  const { id } = req.user

  // grab all req'd info from body obj
  const {
    email,
    phone,
    firstName,
    lastName,
    orgName,
    orgDescription
  } = req.body

  // check possible error states
  // First, some necessary field is missing
  if (!id || !firstName || !lastName || !orgName) {
    res.status(400).json({ error: 'Missing required field(s)' })
  }
  // Second, user id already exists in db
  if (await getUser(id)) {
    // modify accordingly
    res.status(400).json({ error: 'User already exists' })
  }

  // Add rows to db
  try {
    // First, generate id for new org
    const newId = uuid()

    // Second, add new org
    const orgSuccess = await addOrg({
      id: newId,
      name: orgName,
      description: orgDescription
    })
    // Third, add new user as owner
    const userSuccess = await addUser({
      id,
      organization_id: newId,
      first_name: firstName,
      last_name: lastName,
      role: 'owner',
      email,
      phone
    })

    console.log('org success' + orgSuccess)
    console.log('user success' + userSuccess)

    if (orgSuccess && userSuccess) {
      res.status(201).json({
        message: 'Success creating new owner and organization'
      })
    } else {
      // else abort the try block by throwing an error
      throw new Error('error')
    }
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
