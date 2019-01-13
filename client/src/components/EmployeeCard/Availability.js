import React, { Component } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import system from '../../design/theme'
import CardContainer from '../common/CardContainer'

// this component should render the employee's weekly availability. It, in the future, will also have the ability to turn into a form to update such info.
class Availability extends Component {
  render() {
    const { availabilities } = this.props

    return (
      <CardContainer avail>
        {/* display the employee's weekly availability (e.g. Mon, weds. 8am to 5pm)
         in the employees directory, the supervisor should be able to select days and use a timepicker to alter this. */}
        <p>Availability</p>
        {availabilities &&
          availabilities.map(({ id, day, time }) => <p>{`${day} ${time}`}</p>)}
      </CardContainer>
    )
  }
}

export default Availability
