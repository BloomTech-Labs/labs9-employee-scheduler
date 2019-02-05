const express = require('express')
const uuid = require('uuid/v4')
const router = express.Router()
const {
  getUser,
  addUser,
  getInvite,
  addInvite
} = require('../../database/helpers')
const sendInvite = require('../utils/email')

const authorize = require('../config/customMiddleware/authorize')

const invite = role => async (req, res) => {
  const { email, name } = req.body // invitee info
  const { id } = req.user // inviter id
  const { organization_id } = await getUser(id)

  if (!email || !name) {
    return res.status(400).json({ error: 'Missing required field(s)' })
  }

  const inviteId = uuid()

  const newInvite = {
    id: inviteId,
    organization_id,
    inviter_id: id,
    name,
    email,
    role
  }

  const success = await addInvite(newInvite)

  if (success) {
    // so we're not sending tons of email in testing
    if (req.headers.authorization !== 'testing') {
      sendInvite(email, inviteId)
    }
    res.status(201).json({ message: 'Added invite' })
  } else {
    res.status(500).json({ error: 'Error' })
  }
}

router.post('/invite-supervisor', authorize(['owner']), invite('supervisor'))

router.post(
  '/invite-employee',
  authorize(['owner', 'supervisor']),
  invite('employee')
)

// no need to authorize this route because it's coming in from a new person
// so by definition it's coming in from someone who is not yet authorized
router.post('/register/:inviteId', async (req, res) => {
  try {
    const { inviteId } = req.params // invite id
    const { id } = req.user // pulled from firebase token
    const { email, phone, firstName, lastName } = req.body // user info
    const { organization_id, role } = await getInvite(inviteId) // grab info from the invite

    if (!email || !firstName || !lastName) {
      return res.status(400).json({ error: 'Missing required field(s)' })
    }

    const newUser = {
      id,
      organization_id,
      first_name: firstName,
      last_name: lastName,
      role,
      email,
      phone
    }

    const success = await addUser(newUser)

    if (success) {
      res.status(201).json({ message: 'Success' })
    } else {
      res.status(500).json({ error: 'Error' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error' })
  }
})

module.exports = router
