const express = require('express')
const router = express.Router()
const { getDashboard } = require('../../database/helpers')

router.get('/:id', (req, res) => {
  const { id } = req.params
  // id is user id
  getDashboard(id)
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.log(err)
      res.status(404).json(err)
    })
})

module.exports = router
