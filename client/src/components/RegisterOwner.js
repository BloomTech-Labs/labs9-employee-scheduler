import React, { Component } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
// this import style is required for proper codesplitting of firebase
import 'firebase/auth'
// import { authenticate } from '../actions'
import { connect } from 'react-redux'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'cadence-20246.firebaseapp.com',
  databaseURL: 'https://cadence-20246.firebaseio.com',
  projectId: 'cadence-20246',
  storageBucket: 'cadence-20246.appspot.com',
  messagingSenderId: '143190395098'
}

firebase.initializeApp(config)

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
}

class RegisterOwner extends Component {
  componentDidMount() {
    // check that user is not already logged in?
    // render form with info
    // stage 1
    // create account with oauth ...
    // stage 2
    // direct to page where user fills in the rest of the info
  }

  render() {
    console.log(firebase.auth())

    return true ? (
      <h1>display this by default</h1>
    ) : (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    )
  }
}

// probably don't need this either
const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

// do we need redux??
export default connect(
  mapStateToProps,
  { authenticate }
)(RegisterOwner)
