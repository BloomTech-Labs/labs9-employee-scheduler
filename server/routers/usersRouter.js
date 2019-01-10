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

router.get('/current', (req, res) => {}) // get info for current user

router.post('/', (req, res) => {})
router.put('/', (req, res) => {})
router.delete('/', (req, res) => {})

module.exports = router
