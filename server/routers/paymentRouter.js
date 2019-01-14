const express = require('express')
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')
const router = express.Router()

//  stripe one time payment recieve from from front end server
router.post('/', (req, res, next) => {
  const stripeToken = req.body.stripeToken

  stripe.charges.create(
    {
      amount: 2200,
      currency: 'usd',
      description: 'Example charge',
      source: stripeToken
    },
    (err, charge) => {
      // asynchronously called
      console.log('charge: ' + charge) // gives id
      if (err) {
        res.send({
          success: false,
          message: 'error'
        })
      } else {
        res.send({
          success: true,
          message: 'Success'
        })
      }
    }
  )
})

module.exports = router
