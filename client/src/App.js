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
import AvailabilityForm from './components/Availability/AvailabilityForm'
import Join from './components/Join'
import Legal from './components/Legal'
import Team from './components/Team'
import system from './design/theme'
import PrivateRoute from './components/PrivateRoute'
import FourOhFour from './components/common/FourOhFour'
import { Elements, StripeProvider } from 'react-stripe-elements'
import RegisterOwner from './components/RegisterOwner'
import { authenticate, resetAuthState, setRedirectFlagToFalse } from './actions' // for initial call
import { connect } from 'react-redux'
import ReactGA from 'react-ga'
import firebase from 'firebase/app'
// this import style is required for proper codesplitting of firebase
import 'firebase/auth'
import PropTypes from 'prop-types'
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

// google analytics

ReactGA.initialize('UA-133547587-1', {
  debug: false, // sends feedback to the console
  titleCase: false,
  userId: 133547587,
  siteSpeedSampleRate: 100 // rate at which data is sent, default is 1
})
ReactGA.pageview(`${window.location.pathname}`)

class App extends Component {
  constructor() {
    super()
    this.state = {
      stripe: null
    }
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      //checks to see if there is a user logged in.
      this.props.authenticate()
    })

    if (window.Stripe) {
      this.establishStripe()
    } else {
      document
        .querySelector('#stripe-js')
        .addEventListener('load', this.establishStripe)
    }
  }

  establishStripe = () => {
    const stripePKey = process.env.REACT_APP_STRIPE_PKEY
    this.setState({
      stripe: window.Stripe(stripePKey)
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
    setRedirectFlagToFalse()
    resetAuthState()
    window.removeEventListener('load', this.establishStripe)
  }

  render() {
    const { user } = this.props

    return (
      <React.Fragment>
        <Global
          styles={css`
            html {
              font-size: 62.5%;
              font-family: 'Nunito', sans-serif;
              ::-webkit-scrollbar {
                width: 4px;
                background-color: rgba(0, 0, 0, 0.041);
              }
              ::-webkit-scrollbar-thumb {
                background: ${system.color.lightgrey};
                width: 4px;
                border-radius: 50px;
              }
            }

            body {
              height: 100vh;
              &.no-scroll {
                overflow: hidden;
              }
            }

            #root {
              height: 100%;
              width: 100%;
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

            .demo-bold {
              font-family: 'Lato', sans-serif;
              font-weight: bold;
              color: ${system.color.primary};
            }

            .demo-video {
              margin-top: 20px;
              width: 100%;
              height: auto;
            }
          `}
        />

        <StripeProvider stripe={this.state.stripe}>
          <Elements>
            <Switch>
              <Route
                exact
                path="/"
                render={props => {
                  if (
                    user &&
                    (user.role === 'owner' || user.role === 'supervisor')
                  ) {
                    return <Redirect to="/shift-calendar" />
                  } else if (user && user.role === 'employee') {
                    return <Redirect to="/dashboard" />
                  } else {
                    return <Home {...props} />
                  }
                }}
              />
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
                path="/dashboard"
                component={Dashboard}
              />
              <PrivateRoute
                access="all"
                path="/settings"
                component={Settings}
              />
              <PrivateRoute
                access="admin"
                path="/update-availability"
                component={AvailabilityForm}
              />
              <Route path="/register" component={RegisterOwner} />
              <Route path="/login" render={props => <Login {...props} />} />
              <Route path="/join/:id" component={Join} />
              <Route path="/privacy" component={Legal} />
              <Route path="/terms" component={Legal} />
              <Route path="/team" component={Team} />
              <Route path="*" exact={true} component={FourOhFour} />
            </Switch>
          </Elements>
        </StripeProvider>
      </React.Fragment>
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

App.propTypes = {
  auth: PropTypes.object,
  registration: PropTypes.func,
  user: PropTypes.object,
  authenticate: PropTypes.func.isRequired,
  resetAuthState: PropTypes.func.isRequired,
  setRedirectFlagToFalse: PropTypes.func.isRequired,
  userDidLogout: PropTypes.bool.isRequired,
  redirect: PropTypes.bool.isRequired
}
