import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import styled from '@emotion/styled'
import system from '../design/theme'

import Card from './EmployeeCard/Card'
// This will have admin information on employees (name, email, phone number, availability ext), managers will be able to add new employees through here.
class Employees extends Component {
  render() {
    return (
      <OuterContainer>
        <BreadCrumb />
        <h1>Employees</h1>
        <InnerContainer>
          {[...Array(5)].map(() => (
            <Card />
          ))}
        </InnerContainer>
      </OuterContainer>
    )
  }
}

export default Employees

Employees.propTypes = {
  // add propTypes here
}

const OuterContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    padding: ${system.spacing.standardPadding};
    color: ${system.color.bodytext};
    font-size: ${system.fontSizing.l};
  }
`

const InnerContainer = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  h1 {
    padding: ${system.spacing.standardPadding};
    color: ${system.color.bodytext};
    font-size: ${system.fontSizing.l};
  }
`
