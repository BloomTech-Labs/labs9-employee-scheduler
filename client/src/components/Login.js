import React, { Component } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
// this import style is required for proper codesplitting of firebase
import 'firebase/auth'
import { authenticate } from '../actions'
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

class Login extends Component {
  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      //checks to see if there is a user logged in.
      return this.props.authenticate()
    })
  }
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver()
  }

  render() {
    console.log(firebase.auth())

    return this.props.user ? (
      <h1>Success</h1>
    ) : (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    )
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
