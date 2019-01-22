import React, { Component } from 'react'
import propTypes from 'prop-types'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
// this import style is required for proper codesplitting of firebase
import 'firebase/auth'

import { registerViaJoinOrg, authenticate } from '../actions' // for calling once all data is in
import { connect } from 'react-redux'
import Form from './Form/index'
import Login from './Login'
import BreadCrumb from './BreadCrumb'
import { Container } from './common/RegisterContainer'

class Join extends Component {
  state = {
    oauthSuccess: false,
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  }

  componentDidMount() {
    // grab org id from db ?

    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      //checks to see if user has registered yet
      if (firebase.auth().currentUser) {
        const { email, phone, displayName } = firebase.auth().currentUser
        // In case user enters more than two names
        const firstName = displayName.split(' ')[0]
        const lastName = displayName.split(' ').slice(1)[0]

        this.setState({ email, phone, firstName, lastName, oauthSuccess: true })
      }
    })
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver()
  }

  handleChange = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { email, phone, firstName, lastName } = this.state

    this.props.registerViaJoinOrg(
      {
        email,
        phone,
        firstName,
        lastName
      },
      this.props.match.params.id
    )
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

    if (!oauthSuccess) {
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

              <button className="register">Complete Registration</button>
            </form>
          </div>
        </Container>
      )
    }
  }
}

const mapStateToProps = ({ registration }) => ({ registration })

export default connect(
  mapStateToProps,
  { registerViaJoinOrg, authenticate }
)(Join)
