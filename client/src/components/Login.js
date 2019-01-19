import React, { Component } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
// this import style is required for proper codesplitting of firebase
import 'firebase/auth'
import EmptyScreen from './EmptyScreen'
import { authenticate } from '../actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'redirect',
  // We will display Google and Facebook as auth providers.
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  credentialHelper: 'none',
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
}

class Login extends Component {
  render() {
    if (this.props.user) {
      // redirect to home once/if user is in the store
      return <Redirect to="/" />
    } else {
      return (
        <EmptyScreen auth>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </EmptyScreen>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(
  mapStateToProps,
  { authenticate }
)(Login)
