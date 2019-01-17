import React, { Component } from 'react'
import { Global, css } from '@emotion/core'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import Calendar from './components/Calendar'
import Employees from './components/Employees'
import CreateSchedule from './components/CreateSchedule'
import Billing from './components/Billing'
import Home from './components/Home'
import Dashboard from './components/EmployeeDashboard'
import Settings from './components/Settings'
import Login from './components/Login'
import Register from './components/Register'
import PrivateRoute from './components/PrivateRoute'
import FourOhFour from './components/common/FourOhFour'
import { Elements, StripeProvider } from 'react-stripe-elements'
import RegisterOwner from './components/RegisterOwner'
import { authenticate, resetAuthState, setRedirectFlagToFalse } from './actions' // for initial call
import { connect } from 'react-redux'
import firebase from 'firebase/app'
// this import style is required for proper codesplitting of firebase
import 'firebase/auth'

import './reset.css'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'cadence-20246.firebaseapp.com',
  databaseURL: 'https://cadence-20246.firebaseio.com',
  projectId: 'cadence-20246',
  storageBucket: 'cadence-20246.appspot.com',
  messagingSenderId: '143190395098'
}

// in case firebase was already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

class App extends Component {
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      //checks to see if there is a user logged in.
      this.props.authenticate()
    })
  }

  componentDidUpdate() {
    // when user logs out, it will set `userDidLogout` to true
    // this needs to trigger a redirect to `/` using history.push()
    // but first we need to reset auth state so that this method
    // doesn't keep running, pushing `/` to history on each update
    const {
      userDidLogout,
      resetAuthState,
      history,
      redirect,
      setRedirectFlagToFalse
    } = this.props

    if (userDidLogout) {
      resetAuthState()
      history.push('/')
    }

    // we also need a general case of redirect where the auth state is not touched
    // this is used by the register component
    if (redirect) {
      setRedirectFlagToFalse()
      history.push('/')
    }
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver()
  }

  render() {
    const { user } = this.props

    return (
      <div>
        <Global
          styles={css`
            html {
              font-size: 62.5%;
              font-family: 'Nunito', sans-serif;
            }

            * {
              box-sizing: border-box;
            }

            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            label {
              font-family: 'Lato', serif;
            }

            a,
            input,
            button {
              text-decoration: none;
              font-family: 'Nunito', sans-serif;
              outline: none;
            }
          `}
        />

        <Route
          exact
          path="/"
          render={props => {
            if (user && (user.role === 'owner' || user.role === 'supervisor')) {
              return <Redirect to="/shift-calendar" />
            } else if (user && user.role === 'employee') {
              return <Redirect to="/dashboard" />
            } else {
              return <Home {...props} />
            }
          }}
        />

        <StripeProvider apiKey="pk_test_HKBgYIhIo21X8kQikefX3Ei1">
          <Elements>
            <Switch>
              <PrivateRoute
                access="admin"
                path="/employees"
                component={Employees}
              />
              <PrivateRoute
                access="admin"
                path="/shift-calendar"
                component={CreateSchedule}
              />
              <PrivateRoute
                access="owner"
                path="/billing"
                component={Billing}
              />
              <PrivateRoute
                access="admin"
                path="/calendar"
                component={Calendar}
              />
              <PrivateRoute
                access="all"
                path="/dashboard/:id"
                component={Dashboard}
              />
              <PrivateRoute
                access="all"
                path="/settings"
                component={Settings}
              />
              <Route path="/register" component={RegisterOwner} />
              <Route path="/login" render={props => <Login {...props} />} />
              <Route path="*" exact={true} component={FourOhFour} />
            </Switch>
          </Elements>
        </StripeProvider>
      </div>
    )
  }
}

const mapStateToProps = ({
  auth: { user, userDidLogout },
  registration: { redirect }
}) => ({
  user,
  userDidLogout,
  redirect
})

export default withRouter(
  connect(
    mapStateToProps,
    { authenticate, resetAuthState, setRedirectFlagToFalse }
  )(App)
)
