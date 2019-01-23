import React, { Component } from 'react'
import propTypes from 'prop-types'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'

// this import style is required for proper codesplitting of firebase
import 'firebase/auth'
import { registerAsOwner, authenticate, registerReset } from '../actions' // for calling once all data is in
import { connect } from 'react-redux'
//import Form from './Form/index'
import Login from './Login'
import Status from './Status'
import EmptyScreen from './EmptyScreen'
import BreadCrumb from './BreadCrumb'
// import { Container } from './common/RegisterContainer'
import OuterContainer from './common/OuterContainer'
import Button from './common/Button'
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
    orgDescription: ''
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
    const {
      email,
      phone,
      firstName,
      lastName,
      orgName,
      orgDescription
    } = this.state

    if (
      !email ||
      !phone ||
      !firstName ||
      !lastName ||
      !orgName ||
      !orgDescription
    ) {
      alert('Something is missing from your registration details.')
    } else {
      this.props.registerAsOwner({
        email,
        phone,
        firstName,
        lastName,
        orgName,
        orgDescription
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
      orgDescription
    } = this.state
    const { handleChange, handleSubmit } = this
    const { outcome } = this.props.registration // exposes success/fail of axios request

    if (this.props.user) {
      return (
        <EmptyScreen>
          <Status>
            You are already logged in as a registered user. Please log out to
            register a new account.
          </Status>
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
                Please register below. All fields are required.
              </h6>
              <label htmlFor="firstName">First Name</label>
              <Input
                name="firstName"
                type="text"
                value={firstName}
                onChange={handleChange}
                placeholder="ex. Clark"
                ariaLabel="first-name"
                required
              />

              <label htmlFor="lastName">Last Name</label>
              <Input
                name="lastName"
                type="text"
                value={lastName}
                onChange={handleChange}
                placeholder="ex. Kent"
                ariaLabel="last-name"
                required
              />

              <label htmlFor="email">Contact Email</label>
              <Input
                name="email"
                type="text"
                value={email}
                onChange={handleChange}
                placeholder="ex. ckent@dailyplanet.com"
                ariaLabel="email"
                required
              />

              <label htmlFor="phone">Contact Number</label>
              <Input
                name="phone"
                type="tel"
                value={phone}
                onChange={handleChange}
                placeholder="ex. 123-456-7890"
                ariaLabel="phone"
                required
              />

              <label htmlFor="orgName">Organization Name</label>
              <Input
                name="orgName"
                type="text"
                value={orgName}
                onChange={handleChange}
                placeholder="ex. The Daily Planet"
                ariaLabel="org-name"
                required
              />

              <label htmlFor="orgDescription">Organization Description</label>
              <Input
                name="orgDescription"
                type="text"
                value={orgDescription}
                onChange={handleChange}
                placeholder="ex. Metropolis' newspaper of record"
                ariaLabel="org-description"
                required
              />

              <Button type="submit" className="register">
                Register
              </Button>
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
  { registerAsOwner, authenticate, registerReset }
)(RegisterOwner)

const Container = styled('div')`
  margin: 0 7.5rem 5rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    position: relative;
    flex-flow: column nowrap;
    background: ${system.color.white};
    padding: ${system.spacing.bigPadding};
    border-radius: ${system.borders.bigRadius};
    box-shadow: ${system.shadows.otherLight};
    width: 60%;

    #instructions {
      font-size: ${system.fontSizing.m};
      margin-bottom: 50px;
      color: ${system.color.bodytext};
    }

    label {
      font-size: ${system.fontSizing.s};
      padding: 0 5px;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
      color: ${system.color.captiontext};
    }

    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px white inset;
      box-shadow: 0 0 0px 1000px white inset;
    }

    button {
      width: 150px;
    }
  }
`

const Input = styled.input`
  font-size: ${system.fontSizing.m};
  color: ${system.color.bodytext};
  padding: 2.5px 5px;
  margin: 0.5rem 0 ${system.spacing.hugePadding};
  border: none;
  border-bottom: 2px solid #d2d2d2;
  transition: ${system.transition};
  :focus {
    border-bottom: 2px solid ${system.color.primary};
  }
`
