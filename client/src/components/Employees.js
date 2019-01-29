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

  turnOffEditAvailability = () => {
    this.setState({ availTarget: null })
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
            <Modal
              show={Boolean(availTarget)}
              toggleShow={this.turnOffEditAvailability}
              availTarget={availTarget}
            >
              {({ toggleShow, Close, availTarget }) => {
                return availTarget ? (
                  <AvailabilityForm
                    availabilities={availTarget.availabilities}
                    Close={Close}
                    first_name={availTarget.first_name}
                    toggleShow={toggleShow}
                  />
                ) : null
              }}
            </Modal>
            {employees &&
              employees.map((employee, i) => (
                <FlexSpacer key={i}>
                  <Card
                    {...employee}
                    updateAvail={() => this.updateAvail(employee)}
                  />
                </FlexSpacer>
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
const FlexSpacer = styled('div')`
  margin: auto;
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
