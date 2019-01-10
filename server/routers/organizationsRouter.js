const express = require('express')
const router = express.Router()
// const usersDb = require('../../database/helpers')

router.get('/', (req, res) => {
  // usersDb
  //   .getUsers()
  //   .then(users => res.status(200).json(users))
  //   .catch(err => res.status(404).json(err))
})

router.post('/', (req, res) => {
  // const { name } = req.body
  // if (!name) {
  //   res.send('Please enter a name')
  // } else {
  //   usersDb
  //     .insert(name)
  //     .then(count => res.status(201).json(count))
  //     .catch(err => res.status(400).json(err))
  // }
})

router.post('/current', (req, res) => {
  return res.send(req.user.id)
})

module.exports = router
