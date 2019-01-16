import React, { Component } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'
import OuterContainer from './common/OuterContainer'
import Button from './common/Button'
import styled from '@emotion/styled'
import system from '../design/theme'
import axios from 'axios'

class Billing extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    // User clicked submit
    ev.preventDefault()
    const { token } = await this.props.stripe.createToken({ name: 'Name' })
    const submission = {
      token: token,
      email: 'abigail.brown.61@example.com' // this should be the organization owner's email in the future, grab off redux store
    }
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/stripe`, submission, {
        headers: { authorization: 'testing' }
      })
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <OuterContainer height="true">
        <LeftSideBar />
        <BreadCrumb location="Billing" />

        <Container>
          <h1>Billing</h1>
          <form onSubmit={this.submit}>
            <CardElement />
            <Button type="submit">Pay</Button>
          </form>
        </Container>
      </OuterContainer>
    )
  }
}

export default injectStripe(Billing)

Billing.propTypes = {
  // adding propTypes here
}

const Container = styled('div')`
  margin: 0 7.5rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    position: relative;
    flex-flow: column nowrap;
    width: 60%;
    background: ${system.color.white};
    padding: ${system.spacing.bigPadding};
    border-radius: ${system.borders.bigRadius};
    box-shadow: ${system.shadows.otherLight};
    margin-bottom: 20px;

    .StripeElement {
      padding: 10px;
      border-bottom: 2px solid #d2d2d2;
      transition: ${system.transition};
      font-size: 20px !important;

      input {
        font-family: 'Nunito' !important;
      }
    }

    .StripeElement--focus {
      border-bottom: 2px solid ${system.color.primary};
    }

    .StripeElement--invalid {
      border-bottom: 2px solid crimson !important;

      input {
        color: ${system.color.danger};
      }
    }

    button {
      width: 150px;
      margin-top: 40px;
    }
  }
`
