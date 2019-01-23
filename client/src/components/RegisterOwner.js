import React, { Component } from 'react'
import propTypes from 'prop-types'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'

// this import style is required for proper codesplitting of firebase
import 'firebase/auth'
import { registerAsOwner, authenticate, registerReset } from '../actions' // for calling once all data is in
import { connect } from 'react-redux'
import Form from './Form/index'
import Login from './Login'
import Status from './Status'
import EmptyScreen from './EmptyScreen'
import BreadCrumb from './BreadCrumb'
import { Container } from './common/RegisterContainer'

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

    this.props.registerAsOwner({
      email,
      phone,
      firstName,
      lastName,
      orgName,
      orgDescription
    })
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
            You are logged in as a registered user. Please logout to register
          </Status>
        </EmptyScreen>
      )
    } else if (!oauthSuccess) {
      return <Login />
    } else if (outcome) {
      return (
        <Container>
          <BreadCrumb />
          <div className="wrapper">
            <h1 className="headerText" data-testid="register-form">
              {`Registration ${outcome}`}
            </h1>
          </div>
        </Container>
      )
    } else {
      return (
        <Container>
          <BreadCrumb />
          <div className="wrapper">
            <h1 className="headerText" data-testid="register-form">
              Complete Registration
            </h1>
            <form type="submit" onSubmit={handleSubmit}>
              <Form.Group
                property="firstName"
                type="text"
                value={firstName}
                handleChange={handleChange}
                placeholder="First Name..."
                ariaLabel="first-name"
              >
                <Form.Label>First Name</Form.Label>
                <Form.TextInput />
              </Form.Group>

              <Form.Group
                property="lastName"
                type="text"
                value={lastName}
                handleChange={handleChange}
                ariaLabel="last-name"
              >
                <Form.Label>Last Name</Form.Label>
                <Form.TextInput />
              </Form.Group>

              <Form.Group
                property="email"
                type="text"
                value={email}
                handleChange={handleChange}
                ariaLabel="email"
              >
                <Form.Label>Email</Form.Label>
                <Form.TextInput />
              </Form.Group>

              <Form.Group
                property="phone"
                type="number"
                value={phone}
                handleChange={handleChange}
                ariaLabel="phone"
              >
                <Form.Label>Phone Number</Form.Label>
                <Form.TextInput />
              </Form.Group>

              <Form.Group
                property="orgName"
                type="text"
                value={orgName}
                handleChange={handleChange}
                ariaLabel="org-name"
              >
                <Form.Label>Organization Name</Form.Label>
                <Form.TextInput />
              </Form.Group>

              <Form.Group
                property="orgDescription"
                type="text"
                value={orgDescription}
                handleChange={handleChange}
                ariaLabel="org-description"
              >
                <Form.Label>Organization Description</Form.Label>
                <Form.TextInput />
              </Form.Group>

              <button className="register">Register Organization</button>
            </form>
          </div>
        </Container>
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
