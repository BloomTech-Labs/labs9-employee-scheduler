const express = require('express')
const router = express.Router()
const { getOrg, updateOrg, deleteOrg } = require('../../database/helpers')

const authorize = require('../config/customMiddleware/authorize')

router.get('/:id', authorize(['all']), (req, res) => {
  const { id } = req.params
  getOrg(id)
    .then(org => {
      if (!org) {
        return res.status(404).json({ message: 'Nonexistent organization' })
      } else {
        return res.status(200).json(org)
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.put('/:id', authorize(['owner']), async (req, res) => {
  const { id } = req.params

  if (!Object.keys(req.body).length) {
    return res.status(400).json({ error: 'No fields provided to update' })
  }

  try {
    const success = await updateOrg(id, req.body)
    res.status(200).json(success)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' })
  }
})

router.delete('/:id', authorize(['owner']), async (req, res) => {
  const { id } = req.params

  try {
    const success = await deleteOrg(id)
    res.status(200).json(success)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router
