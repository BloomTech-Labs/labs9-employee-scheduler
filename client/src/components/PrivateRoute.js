import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

// takes in a component and it's props and wraps in App.js as
// <PrivateRoute exact path="<routePath>" />

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      // add private route prop conditions here
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
)

PrivateRoute.propTypes = {
  // props types go here
}

const mapStateToProps = state => ({
  // redux props go here
})

export default connect(mapStateToProps)(PrivateRoute)
