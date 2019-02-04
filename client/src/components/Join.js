import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase/app'
// this import style is required for proper codesplitting of firebase
import 'firebase/auth'

import { registerViaJoinOrg, authenticate, logout } from '../actions' // for calling once all data is in
import { connect } from 'react-redux'
import Login from './Login'
import BreadCrumb from './BreadCrumb'
import OuterContainer from './common/OuterContainer'
import { Container, Input } from './common/FormContainer'
import Button from './common/Button'

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

    if (!email || !phone || !firstName || !lastName) {
      alert('Something is missing from your registration details.')
    } else {
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
  }

  render() {
    const { oauthSuccess, email, firstName, lastName } = this.state
    const { handleChange, handleSubmit } = this
    const { outcome } = this.props.registration // exposes success/fail of axios request

    //checks to see if there is a current user logged in and forces a logout to enable registration.
    //this is a bug fix
    if (this.props.token) {
      return (
        <OuterContainer height="true">
          <BreadCrumb />
          <Container className="wrapper">
            <h1 className="headerText">
              Please logout then click the register link in your email again
            </h1>
            <Button onClick={this.props.logout}>Logout</Button>
          </Container>
        </OuterContainer>
      )
    }

    if (!oauthSuccess) {
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
        <OuterContainer height="true">
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
                value={this.props.value}
                onChange={handleChange}
                placeholder="ex. 123-456-7890"
                ariaLabel="phone"
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
  token: auth.token
})

export default connect(
  mapStateToProps,
  { registerViaJoinOrg, authenticate, logout }
)(Join)

Join.propTypes = {
  registration: PropTypes.object.isRequired,
  token: PropTypes.object.isRequired,
  registerViaJoinOrg: PropTypes.func.isRequired,
  authenticate: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}
