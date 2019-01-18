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
        const { id } = customer
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
              res.send({
                subscription_id: subscription.id,
                customer_id: id,
                paid: true
              })
            }
          }
        )
      }
    }
  )
})

module.exports = router
