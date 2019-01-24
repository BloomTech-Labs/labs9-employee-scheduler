import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import styled from '@emotion/styled'
import system from '../design/theme'

import { fetchEmployeesFromDB } from '../actions'
import { connect } from 'react-redux'

import Card from './EmployeeCard/Card'
import LeftSideBar from './LeftSideBar'
import OuterContainer from './common/OuterContainer'
import AddEmployee from './AddEmployee'

// This will have admin information on employees (name, email, phone number, availability ext), managers will be able to add new employees through here.
class Employees extends Component {
  componentDidMount() {
    const { org_id, token, fetchEmployeesFromDB } = this.props
    fetchEmployeesFromDB(org_id, token)
  }

  render() {
    const { employees } = this.props

    return (
      <OuterContainer>
        <BreadCrumb location="Employees" />
        <LeftSideBar />
        <MidContainer>
          <h1>Employee Directory</h1>
          <AddEmployee />
          <InnerContainer>
            {/* just grab the first 12 users for now because the db returns an array of 500*/}
            {employees &&
              employees
                .slice(0, 12)
                .map((employee, i) => <Card key={i} {...employee} />)}
          </InnerContainer>
        </MidContainer>
      </OuterContainer>
    )
  }
}

Employees.propTypes = {
  // add propTypes here
}

const MidContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${system.spacing.container};
  position: relative;
`

const InnerContainer = styled('div')`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: baseline;
  margin: ${system.spacing.standardPadding};
`

const mapStateToProps = state => {
  return {
    org_id: state.auth.user.organization_id,
    employees: state.employees.employees,
    token: state.auth.token
  }
}

export default connect(
  mapStateToProps,
  { fetchEmployeesFromDB }
)(Employees)
