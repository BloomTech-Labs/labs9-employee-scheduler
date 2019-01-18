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
import { connect } from 'react-redux'
import Loader from './Loader'
import Status from './Status'
import { fetchOrgFromDB } from '../actions'

class Billing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      success: false,
      error: false
    }
    this.submit = this.submit.bind(this)
  }

  componentDidMount = () => {
    this.props.fetchOrgFromDB(this.props.user.organization_id, this.props.token)
  }

  async submit(ev) {
    // User clicked submit
    ev.preventDefault()
    this.setState({ loading: true, success: false, error: false })
    // Tokenize payment info by sending to Stripe server
    const { token } = await this.props.stripe.createToken({
      name: `${this.props.user.first_name} ${this.props.user.last_name}`
    })
    const submission = {
      token: token,
      email: this.props.user.email,
      org_id: this.props.user.organization_id
    }
    // create customer and subscription in our back-end
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/stripe`, submission, {
        headers: { authorization: this.props.token }
      })
      .then(res => {
        this.setState({
          loading: false,
          success: true,
          error: false
        })
        document.querySelector('.StripeElement').reset()
      })
      .catch(err =>
        this.setState({
          loading: false,
          success: false,
          error: true
        })
      )
  }

  render() {
    return (
      <OuterContainer height="true">
        <LeftSideBar />
        <BreadCrumb location="Billing" />

        <Container>
          <h1>Billing</h1>
          {this.state.loading ? <Loader /> : null}
          {this.state.success ? (
            <Status success={this.state.success}>
              Great! You're signed up for our $20 / month plan, with a 14-day
              free trial.
            </Status>
          ) : null}
          {this.state.error ? (
            <Status>
              Hmm, something's wrong. Computers make mistakes, too! Please try
              again.
            </Status>
          ) : null}
          <form onSubmit={this.submit}>
            <CardElement />
            <Button type="submit">Pay</Button>
          </form>
        </Container>
      </OuterContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    payment: state.payment
  }
}

export default connect(
  mapStateToProps,
  { fetchOrgFromDB }
)(injectStripe(Billing))

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
