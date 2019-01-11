import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import styled from '@emotion/styled'
import system from '../design/theme'

import { fetchEmployeesFromDB } from '../actions'
import { connect } from 'react-redux'

import Card from './EmployeeCard/Card'
import LeftSideBar from './LeftSideBar'
// This will have admin information on employees (name, email, phone number, availability ext), managers will be able to add new employees through here.
class Employees extends Component {
  state = {
    location: 'Employees'
  }
  componentDidMount() {
    this.props.fetchEmployeesFromDB()
  }

  render() {
    const { employees } = this.props

    return (
      <div>
        <BreadCrumb location={this.state.location} />
        {/* <LeftSideBar />  this is way misaligned on this page...*/}
        <OuterContainer>
          <h1>Employees</h1>
          <InnerContainer>
            {/* just grab the first 12 users for now because the db returns an array of 500*/}
            {employees &&
              employees
                .slice(0, 12)
                .map((employee, i) => <Card key={i} {...employee} />)}
          </InnerContainer>
        </OuterContainer>
      </div>
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
  margin: ${system.spacing.container};

  h1 {
    padding: ${system.spacing.standardPadding};
    color: ${system.color.bodytext};
    font-size: ${system.fontSizing.l};
    margin: ${system.spacing.bigPadding};
  }
`

const InnerContainer = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin: ${system.spacing.standardPadding};
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
