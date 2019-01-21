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
    res.status(400).json({ error: 'Missing required field(s)' })
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
    sendInvite(email, inviteId)
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

router.post(
  '/register/:id',
  authorize(['owner', 'supervisor']),
  async (req, res) => {
    const { id } = req.params // invite id
    const { email, phone, firstName, lastName } = req.body // user info
    const { organization_id, role } = getInvite(id) // grab info from the invite

    if (!email || !name || !firstName || !lastName) {
      res.status(400).json({ error: 'Missing required field(s)' })
    }

    const newUser = {
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
  }
)

router.post('/send-test', (req, res) => {
  console.log('sending email to test account')
  sendInvite('samuelmachat@gmail.com')
})

module.exports = router
