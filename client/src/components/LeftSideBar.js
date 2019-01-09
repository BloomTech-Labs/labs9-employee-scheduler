import React, { Component } from 'react'
import propTypes from 'prop-types'

// this component will represent a button that will control the left side bar.
// it will be brought into container components and an open/close state will be held there.
class BreadCrumb extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <h1>BreadCrumb</h1>
      </div>
    )
  }
}

export default BreadCrumb

BreadCrumb.propTypes = {
  // add propTypes here
}
