const express = require('express')
const router = express.Router()
const stripe = require('stripe')('sk_test_JWY0VJM5YF1tYThn0Z1rMk2N')

router.post('/', (req, res, next) => {
  const { token, email } = req.body
  stripe.customers.create(
    {
      email: email,
      source: token.id
    },
    (err, customer) => {
      if (err) {
        res.status(500).json({ message: 'Failed to create customer', err })
      } else {
        const { id } = customer // this id should be coupled to the organization
        stripe.subscriptions.create(
          {
            customer: id,
            items: [
              {
                plan: 'plan_ELLat7E29umz5Y'
              }
            ]
          },
          (err, subscription) => {
            if (err) {
              res.status(500).json({ message: 'Failed to subscribe', err })
            } else {
              // this is where we add a "paid" bool to the organization
              console.log(`Success: ${subscription}`)
              res.send({ Success: subscription })
            }
          }
        )
      }
    }
  )
})

module.exports = router
