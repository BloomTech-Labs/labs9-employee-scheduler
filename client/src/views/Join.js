import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase/app'
// this import style is required for proper codesplitting of firebase
import 'firebase/auth'

import { registerViaJoinOrg, authenticate, logoutInPlace } from '../actions' // for calling once all data is in
import { connect } from 'react-redux'
import Login from '../components/Login'
import Loader from '../components/common/Loader'
import TopBar from '../components/common/TopBar'
import OuterContainer from '../components/common/OuterContainer'
import { Container, Input } from '../components/common/FormContainer'
import Button from '../components/common/Button'
import { phonePattern } from '../utils'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

const initialState = {
  oauthSuccess: false,
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  terms: false
}

const Join = props => {
  const [state, setState] = useState({ ...initialState })

  useEffect(() => {
    // a cleanup function is returned by firebase.auth().onAuthStateChanged by default
    const cleanupFunction = firebase.auth().onAuthStateChanged(user => {
      //checks to see if user has registered yet
      if (firebase.auth().currentUser) {
        const { email, phone, displayName } = firebase.auth().currentUser
        // In case user enters more than two names
        const firstName = displayName.split(' ')[0]
        const lastName = displayName.split(' ').slice(1)[0]

        setState({
          ...state,
          email,
          phone,
          firstName,
          lastName,
          oauthSuccess: true
        })
      } else {
        setState({
          ...initialState
        })
      }
    })
    return cleanupFunction
  }, [])

  const handleChange = e => {
    e.preventDefault()
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const toggleTerms = () => {
    if (state.terms === false) {
      setState({ ...state, terms: true })
    } else {
      setState({ ...state, terms: false })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    const { email, phone, firstName, lastName, terms } = state

    if (!email || !phone || !firstName || !lastName || !terms) {
      alert('Something is missing from your registration details.')
    } else {
      props.registerViaJoinOrg(
        {
          email,
          phone,
          firstName,
          lastName
        },
        props.match.params.id
      )
    }
  }

  const { oauthSuccess, email, firstName, lastName } = state
  const { outcome } = props.registration // exposes success/fail of axios request

  // checks to see if user information has not yet been checked or is in the process
  // of being checked. Displays loader in either case.
  if (props.isFetching || !props.checkedUser) {
    return (
      <OuterContainer height="true">
        <TopBar />
        <Container className="wrapper">
          <Loader />
        </Container>
      </OuterContainer>
    )
  }
  if (props.token) {
    return (
      <OuterContainer height="true">
        <TopBar />
        <Container className="wrapper">
          <h1 className="headerText">
            You are already logged in as an existing user. Please logout to
            continue the registration process.
          </h1>
          <Button onClick={props.logoutInPlace}>Logout</Button>
        </Container>
      </OuterContainer>
    )
  }

  if (!oauthSuccess) {
    return <Login />
  } else if (outcome) {
    return (
      <OuterContainer height="true">
        <TopBar />
        <Container className="wrapper">
          <h1 className="headerText" data-testid="register-form">
            {`Registration ${outcome}`}
          </h1>
        </Container>
      </OuterContainer>
    )
  } else {
    return (
      <OuterContainer height="true">
        <TopBar />
        <Container className="wrapper">
          <h1 className="headerText" data-testid="register-form">
            Complete Registration
          </h1>
          <form type="submit" onSubmit={handleSubmit}>
            <h6 id="instructions">
              Please register below. All fields are required.
            </h6>
            <label htmlFor="firstName">First Name</label>
            <Input
              name="firstName"
              type="text"
              value={firstName}
              onChange={handleChange}
              placeholder="ex. Carlos"
              ariaLabel="first-name"
              required
            />

            <label htmlFor="lastName">Last Name</label>
            <Input
              name="lastName"
              type="text"
              value={lastName}
              onChange={handleChange}
              placeholder="ex. Lantigua"
              ariaLabel="last-name"
              required
            />

            <label htmlFor="email">Contact Email</label>
            <Input
              name="email"
              type="text"
              value={email}
              onChange={handleChange}
              placeholder="ex. carlos@getcadence.co"
              ariaLabel="email"
              required
            />

            <label htmlFor="phone">Contact Number</label>
            <Input
              name="phone"
              type="tel"
              value={props.value}
              onChange={handleChange}
              placeholder="ex. 123-456-7890"
              ariaLabel="phone"
              pattern={phonePattern}
              required
            />
            <Terms>
              <Input
                name="terms"
                id="terms"
                type="checkbox"
                onChange={toggleTerms}
                required
              />
              <label htmlFor="terms">I have read and agree to the</label>
              <Link to="/terms" className="terms">
                TERMS OF SERVICE
              </Link>
              <label>and</label>
              <Link to="/privacy" className="terms">
                PRIVACY POLICY
              </Link>
            </Terms>

            <Button type="submit" className="register">
              Register
            </Button>
          </form>
        </Container>
      </OuterContainer>
    )
  }
}

const mapStateToProps = ({ registration, auth }) => ({
  registration,
  token: auth.token,
  isFetching: auth.isFetching,
  checkedUser: auth.checkedUser
})

export default connect(
  mapStateToProps,
  { registerViaJoinOrg, authenticate, logoutInPlace }
)(Join)

Join.propTypes = {
  registration: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  registerViaJoinOrg: PropTypes.func.isRequired,
  authenticate: PropTypes.func.isRequired,
  logoutInPlace: PropTypes.func.isRequired
}

const Terms = styled('div')`
  .terms {
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: bold;
  }
`
