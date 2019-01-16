import React, { Component } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
// this import style is required for proper codesplitting of firebase
import 'firebase/auth'
import { authenticate } from '../actions'
import { connect } from 'react-redux'

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
  // check for user in both component did mount (if logged in user navigates here)
  // and component did update (if the login flow succeeds)
  componentDidMount() {
    if (this.props.user) {
      this.props.history.push('/')
    }
  }

  componentDidUpdate() {
    if (this.props.user) {
      this.props.history.push('/')
    }
  }

  render() {
    if (this.props.user) {
      // render an empty div so that react doesn't yell at us for not having a return in render()
      return <div />
    } else {
      return (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
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
