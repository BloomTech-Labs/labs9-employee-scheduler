import React, { Component } from 'react'
import propTypes from 'prop-types'
import BreadCrumb from './BreadCrumb'
import LeftSideBar from './LeftSideBar'
import moment from 'moment'
// import TimeOffApproved from './EmpDashboardComp/TimeOffApproved'
import TimeOffRequest from './EmpDashboardComp/TimeOffRequest'
import styled from '@emotion/styled'
import system from '../design/theme'
import { fetchSingleEmployeeFromDB } from '../actions/employeesActions'

import { connect } from 'react-redux'

// This page will house all of the information that will be visible to the employees when they log in to the site

class DeleteButton extends React.Component {
  state = {
    active: 'centerMe',
    span: 'Delete'
  }

  toggleClass = () => {
    const { active } = this.state
    if (active === 'centerMe') {
      return this.setState({
        active: 'centerMe confirm',
        span: 'Are you sure?'
      })
    }

    if (active === 'centerMe confirm') {
      return this.setState({ active: 'centerMe confirm done', span: 'Deleted' })
    }
  }

  render() {
    const { active, span } = this.state
    return (
      <DeleteConatainer>
        <button className={active} onClick={this.toggleClass}>
          <div className="icon">
            <i className="fas fa-trash-alt" />
            <i className="fas fa-question" />
            <i className="fas fa-check" />
          </div>
          <div class="text">
            <span>{span}</span>
          </div>
        </button>
      </DeleteConatainer>
    )
  }
}
class EmployeeDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: ''
    }
  }

  componentDidMount() {
    const { id } = this.props.auth
    this.props.fetchSingleEmployeeFromDB(id)
  }

  componentDidUpdate(prevProps, nextProps) {
    if (prevProps.error !== this.props.error) {
      this.setState({ error: this.props.error })
    }

    if (prevProps.auth.id !== this.props.auth.id) {
      this.props.fetchSingleEmployeeFromDB(this.props.auth.id)
    }
  }

  // for when we adding loading state to redux
  // componentDidUpdate(nextProps) {
  //   if (nextProps.employee.employee === null & this.props.employee.employee.loading) {
  //     this.props.history.push('/not-found')
  //   }
  // }

  render() {
    console.log(this.props.employee.employee)
    const { employee } = this.props.employee
    let assignedShift
    let approvedTimeOff

    if (employee.shifts) {
      assignedShift = (
        <React.Fragment>
          {employee.shifts.map(item => {
            return (
              <div className="details" key={item.id}>
                <div className="date">
                  <p>
                    {moment(item.start).format('MMM Do, h:mma')} to{' '}
                    {moment(item.end).format('h:mma')}
                  </p>
                </div>
                <div>
                  <p>{item.time}</p>
                </div>
              </div>
            )
          })}
        </React.Fragment>
      )
    } else {
      assignedShift = (
        <Message>
          <p>You haven't been Assigned yet</p>
        </Message>
      )
    }

    if (Object.keys(employee).length === 0) {
      assignedShift = <p>{this.state.error}</p>
      approvedTimeOff = <p>{this.state.error}</p>
    }

    if (employee.time_off) {
      approvedTimeOff = (
        <React.Fragment>
          {employee.time_off.map(item => {
            return (
              <div className="details" key={item.id}>
                <div className="date">
                  <h6>Date</h6>
                  <p data-testid="date">
                    {moment(item.date).format('MMM Do, h:mma')}
                  </p>
                </div>
                <div className="reason">
                  <h6>Reason</h6>
                  <p data-testid="reason">{item.reason}</p>
                  {/* needs logic added to the button to remove the request */}
                </div>
                <div className="status">
                  <h6>Status</h6>
                  <p>{item.status}</p>
                </div>
                <div className="button">
                  <DeleteButton />
                </div>
              </div>
            )
          })}
        </React.Fragment>
      )
    } else {
      approvedTimeOff = (
        <Message>
          <p>No Request Status to display</p>
        </Message>
      )
    }

    return (
      <React.Fragment>
        <LeftSideBar />
        <BreadCrumb location="Employee Dashboard" />
        <Container>
          <div className="employee-welcome">
            <h1>Welcome {this.props.auth.first_name}</h1>
          </div>
          <div className="wrapper">
            <AssignedWrapper>
              <div className="title">
                <h5>Assigned Shifts</h5>
                {/* returns all assigned shift dates and times for the user */}
                {assignedShift}
              </div>
            </AssignedWrapper>

            <TofWrapper className="tof-wrapper">
              <div className="title">
                <h5>Approved Time Off</h5>
                {approvedTimeOff}
              </div>
            </TofWrapper>
            <div className="title">
              <TimeOffRequest />
            </div>
          </div>
        </Container>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    employee: state.employee,
    error: state.error,
    auth: state.auth.user
  }
}

export default connect(
  mapStateToProps,
  { fetchSingleEmployeeFromDB }
)(EmployeeDashboard)

EmployeeDashboard.propTypes = {
  employee: propTypes.object,
  fetchSingleEmployeeFromDB: propTypes.func.isRequired,
  error: propTypes.string
}

const Message = styled('div')`
  margin-top: 30px;
  font-size: ${system.fontSizing.sm};
`

const DeleteConatainer = styled('div')`
  button {
    display: flex;
    cursor: pointer;
    border: 0;
    /* background: transparent; */
    outline: 0;
    overflow: hidden;
    .icon {
      position: relative;
      background: #1d242b;
      line-height: 30px;
      width: 30px;
      height: 30px;
      text-align: center;
      color: #fff;
      font-size: 18px;
      transition: 0.2s color;
      border-radius: 2px;
      .fas {
        width: 30px;
        transition: 0.2s all;
      }
      .fas-check {
        color: #38bb7c;
      }
      .fas-question {
        color: #2492ff;
      }
      &:after {
        content: ' ';
        display: block;
        position: absolute;
        width: 5px;
        height: 5px;
        transform: rotate(45deg);
        background: #1d242b;
        top: 12.5px;
        right: 1px;
        transition: 0.2s right;
        z-index: 1;
      }
    }
    .text {
      position: relative;
      width: 0;
      height: 30px;
      overflow: hidden;
      font-family: 'Roboto', sans-serif;
      background: $red;
      text-align: center;
      line-height: 30px;
      color: #fff;
      font-weight: 300;
      transition: 0.2s all;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
      span {
        width: 100%;
        opacity: 0;
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        transition: 0.3s all;
      }
    }
    &:hover {
      .icon {
        color: #f34541;
        border-radius: 0;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        &:after {
          right: -2px;
        }
      }
      .text {
        width: 120px;
        span {
          opacity: 1;
          top: 0;
        }
      }
    }
    .confirm {
      .icon {
        border-radius: 0;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        .fas {
          transform: translateY(-30px);
        }
        &:after {
          right: -2px;
        }
      }
      .text {
        background: #2492ff;
        width: 120px;
        span {
          opacity: 1;
          top: 0;
        }
      }
    }
    &.done {
      .icon {
        border-radius: 0;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        .fas {
          transform: translateY(-60px);
        }
        &:after {
          right: -2px;
        }
      }
      .text {
        background: #38bb7c;
        width: 120px;
        span {
          opacity: 1;
          top: 0;
        }
      }
    }
  }

  @keyframes fadeInZoom {
    0% {
      opacity: 0;
      transform: scale(0.7);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`

const Container = styled('div')`
  width: 100%;
  padding: ${system.spacing.container};
  display: flex;
  flex-direction: column;
  justify-content: center;
  h6 {
    font-size: ${system.fontSizing.m};
    margin: 10px 0;
  }
  .employee-welcome {
    font-size: ${system.fontSizing.l};
    margin: 15px 0 58px 0;
  }
  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    .title {
      width: 100%;
      min-width: 268px;
      max-width: 500px;
      h5 {
        font-size: ${system.fontSizing.ml};
      }
    }
  }
`
const AssignedWrapper = styled('div')`
  background: ${system.color.white};
  padding: ${system.spacing.standardPadding};
  margin: ${system.spacing.bigPadding};
  border-radius: ${system.borders.bigRadius};
  width: 300px;
  box-shadow: ${system.shadows.other};
  text-align: center;
  .details {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    margin: 33px auto;
    .date {
      min-width: 128px;
    }
    .reason {
      width: 300px;
    }
    p {
      text-align: center;
      width: 100%;
      padding: 2.5px 7.5px;
      font-family: ${props => (props.main ? "'Lato', sans-serif" : 'inherit')};
      font-weight: ${props => (props.main ? 'bold' : null)};
      color: ${props =>
        props.main ? system.color.primary : system.color.captiontext};
      font-size: ${system.fontSizing.sm};
      line-height: ${system.spacing.lineHeight};
    }
  }
`

const TofWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  background: ${system.color.white};
  padding: ${system.spacing.standardPadding};
  margin: ${system.spacing.bigPadding};
  border-radius: ${system.borders.bigRadius};
  width: 500px;
  box-shadow: ${system.shadows.other};
  text-align: center;
  .details {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    margin: 33px auto;
    .date {
      min-width: 128px;
    }
    .reason {
      width: 300px;
    }

    p {
      text-align: center;
      width: 100%;
      padding: 2.5px 7.5px;
      font-family: ${props => (props.main ? "'Lato', sans-serif" : 'inherit')};
      font-weight: ${props => (props.main ? 'bold' : null)};
      color: ${props =>
        props.main ? system.color.primary : system.color.captiontext};
      font-size: ${system.fontSizing.sm};
      line-height: ${system.spacing.lineHeight};
    }
  }
`
