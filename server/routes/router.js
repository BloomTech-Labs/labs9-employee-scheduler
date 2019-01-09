const express = require('express')
const router = express.Router()
const usersDb = require('../../database/helpers/dataModel')

router.get('/', async (req, res) => {
  try {
    res.status(200).json(await usersDb.getUsers())
  } catch (err) {
    res.status(404).json(err)
  }
})

module.exports = router
