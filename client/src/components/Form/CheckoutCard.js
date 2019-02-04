import React from 'react'
import CheckoutForm from './CheckoutForm'
import { Elements, StripeProvider } from 'react-stripe-elements'

class CheckoutCard extends React.Component {
  render() {
    const stripePKey = process.env.STRIPE_PKEY
    return (
      <StripeProvider apiKey={stripePKey}>
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    )
  }
}

export default CheckoutCard
