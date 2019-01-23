import React, { Component } from 'react'
import propTypes from 'prop-types'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
// this import style is required for proper codesplitting of firebase
import 'firebase/auth'

import { registerViaJoinOrg, authenticate } from '../actions' // for calling once all data is in
import { connect } from 'react-redux'
import Login from './Login'
import BreadCrumb from './BreadCrumb'
import OuterContainer from './common/OuterContainer'
import Button from './common/Button'
import styled from '@emotion/styled'
import system from '../design/theme'

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

const mapStateToProps = ({ registration }) => ({ registration })

export default connect(
  mapStateToProps,
  { registerViaJoinOrg, authenticate }
)(Join)

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
