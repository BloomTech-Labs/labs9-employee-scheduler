import React, { Suspense } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import EmptyScreen from './EmptyScreen'
import PropTypes from 'prop-types'

import Loader from './Loader'
import Status from './Status'

// takes in a component and it's props and wraps in App.js as
// <PrivateRoute exact path="<routePath>" />

// time to display error message
const errorInterval = 3000
const loadingInterval = 8000

class PrivateRoute extends React.Component {
  state = { errorTimeout: false, loadingTimeout: false }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  }

  render() {
    const { user, error, component: Component, access, ...rest } = this.props

    return (
      <Route
        {...rest}
        render={ownProps => {
          // initialize authentication process if no user on redux state
          if (!user) {
            // checks to see if auth was already unsuccessfully tried
            if (error) {
              console.log(error)
              // checks to see if an message has already been displayed
              if (!this.state.errorTimeout) {
                // if so, displays error message and starts timeout
                this.timeout = setTimeout(() => {
                  this.timeout = null
                  this.setState({ errorTimeout: true })
                }, errorInterval)
                return (
                  <EmptyScreen>
                    <Status>{`Ruh-roh, something's wrong: ${error}`}</Status>
                  </EmptyScreen>
                )
              }
              // else, redirects to root
              return <Redirect to="/" />
            }

            // otherwise App is still going through auth process, but has not errored,
            // so show loading screen.
            if (!this.state.loadingTimeout) {
              this.timeout = setTimeout(() => {
                this.timeout = null
                this.setState({ loadingTimeout: true })
              }, loadingInterval)
              return (
                <EmptyScreen>
                  <Loader />
                </EmptyScreen>
              )
            } else {
              // else, redirects to root
              return <Redirect to="/" />
            }
          }

          // if user exists on state, then verify user authorization
          const { role } = user
          let hasPermission =
            (access === 'owner' && role === 'owner') ||
            (access === 'admin' &&
              (role === 'owner' || role === 'supervisor')) ||
            access === 'all'

          if (hasPermission) {
            return (
              <Suspense
                fallback={
                  <EmptyScreen>
                    <Loader />
                  </EmptyScreen>
                }
              >
                <Component {...ownProps} {...rest} />
              </Suspense>
            )
          } else {
            return <Redirect to="/" />
          }
        }}
      />
    )
  }
}

PrivateRoute.propTypes = {
  user: PropTypes.object,
  error: PropTypes.string,
  component: PropTypes.func,
  access: PropTypes.string
}

const mapStateToProps = ({ auth: { user, error } }) => ({
  user,
  error
})

export default connect(mapStateToProps)(PrivateRoute)
