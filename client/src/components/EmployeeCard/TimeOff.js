import React, { Component } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import system from '../../design/theme'

// this component should render the employee's PTO. It will also display pending PTO so managers can approve or reject.
class TimeOff extends Component {
  render() {
    return (
      <Container>
        {/* Employee's Time Off */}
        {/* When this component is being rendered on the calendar page employee sidebar, it should show approved PTO
        When it's on the employees directory page, it should show pending PTO */}
        <h3>Requested Time Off</h3>
      </Container>
    )
  }
}

export default TimeOff

TimeOff.propTypes = {
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
