import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import styled from '@emotion/styled'
import system from '../design/theme'

import { fetchEmployeesFromDB } from '../actions'
import { connect } from 'react-redux'

import Card from './EmployeeCard/Card'
// This will have admin information on employees (name, email, phone number, availability ext), managers will be able to add new employees through here.
class Employees extends Component {
  componentDidMount() {
    this.props.fetchEmployeesFromDB()
  }

  render() {
    const { employees } = this.props

    return (
      <OuterContainer>
        <BreadCrumb />
        <h1>Employees</h1>
        <InnerContainer>
          {/* just grab the first 10 users for now because the db returns an array of 500*/}
          {employees &&
            employees
              .slice(0, 10)
              .map((employee, i) => <Card key={i} {...employee} />)}
        </InnerContainer>
      </OuterContainer>
    )
  }
}

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
  margin: ${system.spacing.standardPadding};

  h1 {
    padding: ${system.spacing.standardPadding};
    color: ${system.color.bodytext};
    font-size: ${system.fontSizing.l};
  }
`

const mapStateToProps = state => {
  return {
    employees: state.employees.employees
  }
}

export default connect(
  mapStateToProps,
  { fetchEmployeesFromDB }
)(Employees)
