import React, { useState, useEffect } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import PropTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'
import OuterContainer from './common/OuterContainer'
import { Container } from './common/FormContainer'
import Button from './common/Button'
import axios from 'axios'
import { connect } from 'react-redux'
import Loader from './Loader'
import Status from './Status'
import { fetchOrgFromDB } from '../actions'

const Billing = props => {
  const [state, setState] = useState({
    paid: false,
    loading: false,
    signupSuccess: false,
    cancelSuccess: false,
    error: false
  })
  // this.submit = this.submit.bind(this)
  // this.cancelSub = this.cancelSub.bind(this)

  useEffect(() => {
    return props.fetchOrgFromDB(props.user.organization_id, props.token)
  }, [])

  const submit = async ev => {
    // User clicked submit
    ev.preventDefault()
    setState({
      loading: true,
      signupSuccess: false,
      cancelSuccess: false,
      error: false
    })
    // Tokenize payment info by sending to Stripe server
    const { token } = await props.stripe.createToken({
      name: `${props.user.first_name} ${props.user.last_name}`
    })
    const submission = {
      token: token,
      email: props.user.email,
      org_id: props.user.organization_id
    }
    // create customer and subscription in our back-end
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/stripe`, submission, {
        headers: { authorization: props.token }
      })
      .then(res => {
        setState({
          loading: false,
          signupSuccess: true,
          cancelSuccess: false,
          error: false
        })
        props.fetchOrgFromDB(props.user.organization_id, props.token)
      })
      .catch(err => {
        setState({
          loading: false,
          signupSuccess: false,
          cancelSuccess: false,
          error: true
        })
      })
  }

  const deleteHandler = ev => {
    ev.preventDefault()
    const r = window.confirm(
      'Are you sure you want to cancel your subscription?'
    )

    if (r) {
      return cancelSub(ev)
    }
  }

  const cancelSub = ev => {
    ev.preventDefault()
    setState({
      loading: true,
      signupSuccess: false,
      cancelSuccess: false,
      error: false
    })
    const submission = {
      subscription_id: props.organization.subscription_id,
      org_id: props.user.organization_id
    }
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/stripe`, submission, {
        headers: { authorization: props.token }
      })
      .then(res => {
        props.fetchOrgFromDB(props.user.organization_id, props.token)
        setState({
          loading: false,
          signupSuccess: false,
          cancelSuccess: true,
          error: false
        })
      })
      .catch(err => {
        setState({
          loading: false,
          signupSuccess: false,
          cancelSuccess: false,
          error: true
        })
      })
  }

  if (Boolean(props.organization.paid)) {
    return (
      <OuterContainer height="true">
        <LeftSideBar />
        <BreadCrumb location="Billing" />

        <Container danger>
          <h1>Billing</h1>
          {state.loading ? <Loader /> : null}
          {state.signupSuccess ? (
            <Status success={state.signupSuccess}>
              You're signed up for our $20/mo plan, with a 14-day free trial!{' '}
              <span role="img" aria-label="smiling eyes emoji">
                &#x1F60A;
              </span>
            </Status>
          ) : null}
          {state.cancelSuccess ? (
            <Status success={state.cancelSuccess}>
              You've successfully canceled your account, but we're sad to see
              you go.{' '}
              <span role="img" aria-label="weeping emoji">
                &#x1F62D;
              </span>
            </Status>
          ) : null}
          {state.error ? (
            <Status>
              Something's wrong. Computers make mistakes, too!{' '}
              <span role="img" aria-label="wink emoji">
                &#x1F916;
              </span>{' '}
              Please try again.
            </Status>
          ) : null}
          ) }
          <form onSubmit={deleteHandler}>
            //checks to see if the owner has a paid account and displays a
            message accordingly
            {props.organization.paid ? (
              <h6 id="instructions">
                You are signed up for the Pro Plan at $20 / month, which
                includes:
              </h6>
            ) : (
              <h6 id="instructions">
                Here's what's included in the $20 / month Pro Plan:
              </h6>
            )}
            <ul>
              <li>A simple calendar interface to manage shifts.</li>
              <li>
                An employee directory to add new users and adjust availability.
              </li>
              <li>A PTO management system for employees' time off requests.</li>
              <li>
                A convenient dashboard where an employee can see their shifts
                and time off.
              </li>
              <li>Up to 20 total user accounts in our software.</li>
              <li>Different views for you, supervisors, and employees.</li>
            </ul>
            <Button className="danger" type="submit">
              Cancel Subscription
            </Button>
          </form>
        </Container>
      </OuterContainer>
    )

    return (
      <OuterContainer height="true">
        <LeftSideBar />
        <BreadCrumb location="Billing" />

        <Container billing>
          <h1>Billing</h1>

          {state.loading ? <Loader /> : null}
          {state.signupSuccess ? (
            <Status success={state.signupSuccess}>
              You're signed up for our $20/mo plan, with a 14-day free trial!{' '}
              <span role="img" aria-label="smiling eyes emoji">
                &#x1F60A;
              </span>
            </Status>
          ) : null}
          {state.cancelSuccess ? (
            <Status success={state.cancelSuccess}>
              You've successfully canceled your account, but we're sad to see
              you go.{' '}
              <span role="img" aria-label="weeping emoji">
                &#x1F62D;
              </span>
            </Status>
          ) : null}
          {state.error ? (
            <Status>
              Something's wrong. Computers make mistakes, too!{' '}
              <span role="img" aria-label="wink emoji">
                &#x1F916;
              </span>{' '}
              Please try again.
            </Status>
          ) : null}

          <form onSubmit={submit}>
            <h6 id="instructions">
              Here's what's included in the $20 / month Pro Plan:
            </h6>
            <ul>
              <li>A 14-day free trial.</li>
              <li>A simple calendar interface to manage shifts.</li>
              <li>
                An employee directory to add new users and adjust availability.
              </li>
              <li>A PTO management system for employees' time off requests.</li>
              <li>
                A convenient dashboard where an employee can see their shifts
                and time off.
              </li>
              <li>Up to 20 total user accounts in our software.</li>
              <li>Different views for you, supervisors, and employees.</li>
            </ul>
            <CardElement />
            <Button type="submit">Subscribe Now</Button>
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
    organization: state.organization.details
  }
}

export default connect(
  mapStateToProps,
  { fetchOrgFromDB }
)(injectStripe(Billing))

Billing.propTypes = {
  user: PropTypes.object,
  organization: PropTypes.object,
  fetchOrgFromDB: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  error: PropTypes.string
}
