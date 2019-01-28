import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'
import TimeOffApproved from './EmpDashboardComp/TimeOffApproved'
import TimeOffRequest from './EmpDashboardComp/TimeOffRequest'
import AssignedShifts from './EmpDashboardComp/AssignedShifts'
import {
  fetchSingleEmployeeFromDB,
  deleteTimeOffRequest
} from '../actions/employeesActions'
import { connect } from 'react-redux'
import { Message, Container, Card } from './EmpDashboardComp/styles'
import OuterContainer from './common/OuterContainer'

// This page will house all of the information that will be visible to the employees when they log in to the site

class EmployeeDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: ''
    }
  }

  componentDidMount() {
    const { id } = this.props.auth.user
    this.props.fetchSingleEmployeeFromDB(id, this.props.auth.token)
  }

  componentDidUpdate(prevProps, nextProps) {
    if (prevProps.error !== this.props.error) {
      return this.setState({ error: this.props.error })
    }
  }

  deleteExpiredRequest = (torId, token) => {
    const r = window.confirm(
      `This will delete your PTO request. Are you sure you want to do that?`
    )
    if (r) {
      this.props.deleteTimeOffRequest(torId, token)
    }
  }

  // for when we adding loading state to redux
  // componentDidUpdate(nextProps) {
  //   if (nextProps.employee.employee === null & this.props.employee.employee.loading) {
  //     this.props.history.push('/not-found')
  //   }
  // }

  render() {
    const { employee } = this.props.employee

    return (
      <OuterContainer>
        <LeftSideBar />
        <BreadCrumb location="Employee Dashboard" />

        <Container>
          <div className="employee-welcome">
            <h1>
              Hi there, {this.props.auth.user.first_name}. Hope you're having a
              lovely day!
            </h1>
          </div>

          <div className="wrapper">
            <Card>
              <div className="title">
                <h5>Your Shifts</h5>
              </div>
              {/* returns all assigned shift dates and times for the user */}
              {employee && employee.shifts ? (
                <>
                  {employee.shifts.map(item => {
                    return <AssignedShifts key={item.id} {...item} />
                  })}
                </>
              ) : (
                <Message>
                  <p>You haven't been assigned a shift yet.</p>
                </Message>
              )}
            </Card>

            <Card className="tof-wrapper">
              <div className="title">
                <h5>Approved Time Off</h5>
                {employee && employee.time_off.length ? (
                  <Message>
                    <>
                      {employee.time_off.map(item => (
                        <TimeOffApproved
                          key={item.id}
                          status={item.status}
                          date={item.date}
                          reason={item.reason}
                          deleteExpiredRequest={() =>
                            this.deleteExpiredRequest(
                              item.id,
                              this.props.auth.token
                            )
                          }
                        />
                      ))}
                    </>
                  </Message>
                ) : (
                  <p>No requests to display.</p>
                )}
              </div>
            </Card>

            <Card>
              <div className="title">
                <h5>Request Time Off</h5>
              </div>
              <TimeOffRequest />
            </Card>
          </div>
        </Container>
      </OuterContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    employee: state.employee,
    error: state.error,
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  { fetchSingleEmployeeFromDB, deleteTimeOffRequest }
)(EmployeeDashboard)

EmployeeDashboard.propTypes = {
  employee: propTypes.object,
  fetchSingleEmployeeFromDB: propTypes.func.isRequired,
  error: propTypes.string
}
