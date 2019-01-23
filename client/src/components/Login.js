import React, { Component } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
// this import style is required for proper codesplitting of firebase
import 'firebase/auth'
import EmptyScreen from './EmptyScreen'
import { authenticate } from '../actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  uiConfig = {
    // Configure FirebaseUI.
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
  render() {
    if (this.props.user) {
      // redirect to home once/if user is in the store
      return <Redirect to="/" />
    } else if (this.props.isNewUser) {
      return <Redirect to="/register" />
    } else {
      return (
        <EmptyScreen auth>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </EmptyScreen>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isNewUser: state.auth.isNewUser
  }
}

export default connect(
  mapStateToProps,
  { authenticate }
)(Login)
