import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
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
