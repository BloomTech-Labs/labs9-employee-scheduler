import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'

// This component will render out settings for the signed in user
class Settings extends Component {
  render() {
    return (
      <div>
        <BreadCrumb />
        <h1>Settings</h1>
      </div>
    )
  }
}

export default Settings

Settings.propTypes = {
  // add propTypes here
}
