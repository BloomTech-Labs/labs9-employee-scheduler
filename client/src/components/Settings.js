import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'

// This component will render out settings for the signed in user
class Settings extends Component {
  state = {
    location: 'Settings'
  }
  render() {
    return (
      <div>
        <LeftSideBar />
        <BreadCrumb location={this.state.location} />
      </div>
    )
  }
}

export default Settings

Settings.propTypes = {
  // add propTypes here
}
