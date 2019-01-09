import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

const config = {
  // this is all public and was copied from the firebase console - Adam
  // not included in .env because it's not sensitive
  apiKey: 'AIzaSyA3bv7tMZL8pW0RjItXJaksvEghvAWTtMY',
  authDomain: 'cadence-4f66e.firebaseapp.com',
  databaseURL: 'https://cadence-4f66e.firebaseio.com',
  projectId: 'cadence-4f66e',
  storageBucket: 'cadence-4f66e.appspot.com',
  messagingSenderId: '274823729425'
};

firebase.initializeApp(config);

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
};

class Login extends Component {
  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      firebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ false)
        .then(function(idToken) {
          console.log('id token', idToken);
        })
        .catch(function(error) {
          console.log(error);
          // Handle error
        });
    });
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    return (
      <div>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
}

export default Login;
