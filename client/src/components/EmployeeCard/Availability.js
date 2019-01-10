import React, { Component } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import system from '../../design/theme'

// this component should render the employee's weekly availability. It, in the future, will also have the ability to turn into a form to update such info.
class Availability extends Component {
  render() {
    return (
      <Container>
        {/* display the employee's weekly availability (e.g. Mon, weds. 8am to 5pm)
         in the employees directory, the supervisor should be able to select days and use a timepicker to alter this. */}
        <h3>Availability</h3>
      </Container>
    )
  }
}

export default Availability

Availability.propTypes = {
  // adding propTypes here
}

const Container = styled('div')`
  border: 1px solid grey;
  padding: ${system.spacing.standardPadding};

  p {
    padding: ${system.spacing.standardPadding};
    color: ${system.color.bodytext};
    font-size: ${system.fontSizing.m};
  }
`
