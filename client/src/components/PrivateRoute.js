import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

// takes in a component and it's props and wraps in App.js as
// <PrivateRoute exact path="<routePath>" />

const PrivateRoute = ({ component: Component, user, access, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (user) {
        const { role } = user

        let hasPermission = false
        if (
          (access = 'owner' && role === 'owner') ||
          (access = 'admin' && (role === 'owner' || role === 'supervisor')) ||
          (access = 'all')
        ) {
          hasPermission = true
        }

        if (hasPermission) {
          return <Component {...props} />
        } else {
          return <Redirect to="/" />
        }
      } else {
        return <Redirect to="/login" />
      }
    }}
  />
)

PrivateRoute.propTypes = {
  // props types go here
}

const mapStateToProps = ({ auth: { user } }) => ({
  user
})

export default connect(mapStateToProps)(PrivateRoute)
