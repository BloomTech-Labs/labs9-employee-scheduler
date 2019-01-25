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
import AvailabilityForm from './Availability/AvailabilityForm'
import Button from './common/Button'
import Modal from './Modal'

// This will have admin information on employees (name, email, phone number, availability ext), managers will be able to add new employees through here.
class Employees extends Component {
  state = {
    availTarget: null,
    show: false
  }
  componentDidMount() {
    const { org_id, token, fetchEmployeesFromDB } = this.props
    fetchEmployeesFromDB(org_id, token)
  }

  updateAvail = user => {
    this.setState({ availTarget: user })
  }

  toggleShow = () => {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    const { employees } = this.props
    const { availTarget } = this.state
    return (
      <OuterContainer location="Employees ">
        <BreadCrumb location="Employees" />
        <LeftSideBar fixed />
        <MidContainer>
          <h1>Employee Directory</h1>
          <Button onClick={this.toggleShow}>Add Employee</Button>
          <Modal show={this.state.show} toggleShow={this.toggleShow}>
            <AddEmployee />
          </Modal>
          <InnerContainer>
            {availTarget ? (
              <div>
                <p>{availTarget.first_name}</p>
                <AvailabilityForm id={availTarget.id} />
              </div>
            ) : null}

            {/* just grab the first 12 users for now because the db returns an array of 500*/}
            {employees &&
              employees
                .slice(0, 12)
                .map((employee, i) => (
                  <Card key={i} {...employee} updateAvail={this.updateAvail} />
                ))}
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
  margin-top: 75px;
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
