const express = require('express')
const router = express.Router()
const { getDashboard } = require('../../database/helpers')

const authorize = require('../config/customMiddleware/authorize')

router.get('/', authorize(['all']), (req, res) => {
  const { id } = req.user
  // id is user id
  getDashboard(id)
    .then(users => res.status(200).json(users))
    .catch(err => res.status(404).json(err))
})

module.exports = router
