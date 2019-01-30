import React, { Component } from 'react'
import propTypes from 'prop-types'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'

// this import style is required for proper codesplitting of firebase
import 'firebase/auth'
import {
  registerAsOwner,
  authenticate,
  registerReset,
  logout
} from '../actions' // for calling once all data is in
import { connect } from 'react-redux'
import Login from './Login'
import Status from './Status'
import EmptyScreen from './EmptyScreen'
import BreadCrumb from './BreadCrumb'
import OuterContainer from './common/OuterContainer'
import { Container, Input, Select } from './common/FormContainer'
import { Redirect } from 'react-router-dom'
import Button from './common/Button'
import industryList from '../industryList'
import styled from '@emotion/styled'
import system from '../design/theme'

class RegisterOwner extends Component {
  state = {
    oauthSuccess: false,
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    orgName: '',
    industry: ''
  }
  // ideall we'd start by checking that the user is not already logged in
  // we're not doing that now
  // what we're doing is this
  // stage 1
  // create account with oauth ...
  // stage 2
  // direct to page where user fills in the rest of the info
  // stage 3
  // submit request to server, update state to reflect response

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      //checks to see if user has registered yet
      if (firebase.auth().currentUser) {
        const { email, displayName } = firebase.auth().currentUser
        // In case user enters more than two names
        const firstName = displayName.split(' ')[0]
        const lastName = displayName.split(' ').slice(1)[0]

        this.setState({ email, firstName, lastName, oauthSuccess: true })
      }
    })
  }
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.props.registerReset()
    this.unregisterAuthObserver()
  }

  handleChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { email, phone, firstName, lastName, orgName, industry } = this.state

    if (!email || !phone || !firstName || !lastName || !orgName) {
      alert('Something is missing from your registration details.')
    } else {
      this.props.registerAsOwner({
        email,
        phone,
        firstName,
        lastName,
        orgName,
        industry
      })
    }
  }

  render() {
    const {
      oauthSuccess,
      email,
      phone,
      firstName,
      lastName,
      orgName,
      industry
    } = this.state
    const { handleChange, handleSubmit } = this
    const { outcome } = this.props.registration // exposes success/fail of axios request

    if (this.props.user) {
      return (
        <EmptyScreen>
          <Status>
            There is already an account for this email. Please log out to
            register a new account.
          </Status>
          <Redirect to="/shift-calendar" />
        </EmptyScreen>
      )
    } else if (!oauthSuccess) {
      return <Login />
    } else if (outcome) {
      return (
        <OuterContainer height="true">
          <BreadCrumb />
          <Container className="wrapper">
            <h1 className="headerText" data-testid="register-form">
              {`Registration ${outcome}`}
            </h1>
          </Container>
        </OuterContainer>
      )
    } else {
      return (
        <OuterContainer>
          <BreadCrumb />
          <Container className="wrapper">
            <h1 className="headerText" data-testid="register-form">
              Complete Registration
            </h1>
            <form type="submit" onSubmit={handleSubmit}>
              <h6 id="instructions">
                Please register below. Starred fields are required.
              </h6>
              <label htmlFor="firstName">First Name *</label>
              <Input
                name="firstName"
                type="text"
                value={firstName}
                onChange={handleChange}
                placeholder="ex. Samuel"
                ariaLabel="first-name"
                required
              />

              <label htmlFor="lastName">Last Name *</label>
              <Input
                name="lastName"
                type="text"
                value={lastName}
                onChange={handleChange}
                placeholder="ex. Machat"
                ariaLabel="last-name"
                required
              />

              <label htmlFor="email">Contact Email *</label>
              <Input
                name="email"
                type="text"
                value={email}
                onChange={handleChange}
                placeholder="ex. samuel@getcadence.co"
                ariaLabel="email"
                required
              />

              <label htmlFor="phone">Contact Number *</label>
              <Input
                name="phone"
                type="tel"
                value={phone}
                onChange={handleChange}
                placeholder="ex. 123-456-7890"
                ariaLabel="phone"
                required
              />

              <label htmlFor="orgName">Organization Name *</label>
              <Input
                name="orgName"
                type="text"
                value={orgName}
                onChange={handleChange}
                placeholder="ex. Cadence"
                ariaLabel="org-name"
                required
              />

              <label htmlFor="industry">Your Industry</label>
              <Select
                name="industry"
                type="text"
                onChange={handleChange}
                placeholder="ex. software"
                ariaLabel="org-description"
                defaultValue={' '}
              >
                {industryList.map((industry, i) => (
                  <option value={industry} key={i}>
                    {industry}
                  </option>
                ))}
              </Select>
              <ButtonContainer>
                <div>
                  <Button type="submit" className="register">
                    Register
                  </Button>
                </div>

                <Button onClick={this.props.logout} cancel>
                  Cancel
                </Button>
              </ButtonContainer>
            </form>
          </Container>
        </OuterContainer>
      )
    }
  }
}

const mapStateToProps = ({ registration, auth }) => ({
  registration,
  user: auth.user
})

export default connect(
  mapStateToProps,
  { registerAsOwner, authenticate, registerReset, logout }
)(RegisterOwner)

const ButtonContainer = styled('div')`
  display: flex;
  flex-direction: row;

  div {
    margin-right: 20px;
  }
`
