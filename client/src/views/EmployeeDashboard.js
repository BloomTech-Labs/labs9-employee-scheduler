import React, { Component, Suspense } from 'react'
import propTypes from 'prop-types'
import TopBar from '../components/common/TopBar'
import Loader from '../components/common/Loader'
import Button from '../components/common/Button'
import {
  fetchSingleEmployeeFromDB,
  deleteTimeOffRequest,
  fetchHoursFromDB,
  fetchEmployeesFromDB
} from '../actions'
import { connect } from 'react-redux'
import { Message, Container, Card } from '../components/EmployeeDashboard/styles'
import OuterContainer from '../components/common/OuterContainer'
import { getHoursOfOperationRange, getRange } from '../utils'
import styled from '@emotion/styled'
import system from '../design/theme'
import AssignedShifts from '../components/EmployeeDashboard/AssignedShifts'
const TimeOffApproved = React.lazy(() =>
  import('../components/EmployeeDashboard/TimeOffApproved')
)
const NavMenu = React.lazy(() => import('../components/common/NavMenu'))
const TimeOffRequest = React.lazy(() =>
  import('../components/EmployeeDashboard/TimeOffRequest')
)
const Availability = React.lazy(() =>
  import('../components/EmployeeDashboard/Availability')
)
const DashCal = React.lazy(() => import('../components/EmployeeDashboard/DashCal'))

// This page will house all of the information that will be visible to the employees when they log in to the site

const MEDIUM_BP = Number.parseInt(system.breakpoints[1].split(' ')[1])
const SMALL_BP = Number.parseInt(system.breakpoints[0].split(' ')[1])

class EmployeeDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: '',
      view: 'week',
      date: new Date(),
      width: 'desktop',
      employeeView: 'all'
    }
  }

  componentDidMount() {
    this.fetchData()

    // handle responsiveness for calendar
    this.updateWidth()
    window.addEventListener('resize', this.updateWidth)
  }

  componentDidUpdate(prevProps, nextProps) {
    if (prevProps.error !== this.props.error) {
      return this.setState({ error: this.props.error })
    }
  }

  updateWidth = () => {
    const width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    )

    if (Number.parseInt(width) < SMALL_BP) {
      return this.setState({
        width: 'mobile',
        view: 'day'
      })
    } else if (Number.parseInt(width) < MEDIUM_BP) {
      return this.setState({
        width: 'tablet',
        view: 'day'
      })
    } else {
      return this.setState({
        width: 'desktop',
        view: 'week'
      })
    }
  }

  deleteExpiredRequest = (torId, token) => {
    const r = window.confirm(
      `This will rescind your PTO request. Are you sure you want to do that?`
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

  changeDate = direction => {
    this.setState(({ date, view }) => {
      let returnVal = new Date()
      let day = 1000 * 60 * 60 * 24
      const inc = view === 'week' ? 7 * day : day
      if (direction === 'left') {
        returnVal = new Date(date.getTime() - inc)
      } else if (direction === 'right') {
        returnVal = new Date(date.getTime() + inc)
      }
      const range = getRange({ view, date: returnVal })
      return { date: returnVal, range }
    })
  }

  fetchData() {
    const { organization_id } = this.props.user
    this.props.fetchHoursFromDB(organization_id, this.props.token)
    this.props.fetchEmployeesFromDB(organization_id, this.props.token)
    this.props.fetchSingleEmployeeFromDB(this.props.token)
  }

  toggleCalView = () => {
    if (this.state.view === 'week') {
      return this.setState({
        view: 'day',
        range: getRange({ view: 'day', date: this.state.date })
      })
    } else {
      return this.setState({
        view: 'week',
        range: getRange({ view: 'week', date: this.state.date })
      })
    }
  }

  toggleEmployeeView = () => {
    if (this.state.employeeView === 'all') {
      this.setState({ employeeView: 'single' })
    } else {
      this.setState({ employeeView: 'all' })
    }
  }

  render() {
    const { employees, hours, employee } = this.props
    const { view, date, width, employeeView } = this.state
    const { id } = this.props.user
    const names = []
    employees.map(employee => names.push(`${employee.first_name}`))

    //events for all employees
    const events = employees.reduce((acc, employee) => {
      return [
        ...acc,
        ...employee.events.map(event => {
          if (employeeView === 'all') {
            return {
              ...event,
              start: new Date(event.start),
              end: new Date(event.end),
              title: `${employee.first_name} ${employee.last_name}`
            }
          } else if (event.user_id === id && employeeView === 'single') {
            return {
              ...event,
              start: new Date(event.start),
              end: new Date(event.end),
              title: `${employee.first_name} ${employee.last_name}`
            }
          } else {
            return null
          }
        })
      ]
    }, [])

    let hourRange = getHoursOfOperationRange(hours, false)

    return (
      <OuterContainer>
        <Suspense fallback={<div>Loading...</div>}>
          <NavMenu />
        </Suspense>
        <TopBar location="Employee Dashboard" />

        <Container>
          <div className="employee-welcome">
            <h1>
              Hi there, {this.props.auth.user.first_name}. Hope you're having a
              lovely day!
            </h1>
          </div>
          <CalendarButtons>
            <NavButtons>
              <Button onClick={() => this.changeDate('left')}>&#8592;</Button>
              <ToggleButton onClick={() => this.changeDate('today')}>
                Today
              </ToggleButton>
              <Button onClick={() => this.changeDate('right')}>&#8594;</Button>
              {width === 'mobile' || width === 'tablet' ? (
                <ToggleButton onClick={this.toggleEmployeeView}>
                  {employeeView === 'all' ? 'My Shift' : 'All Shifts'}
                </ToggleButton>
              ) : null}
            </NavButtons>
            <div>
              {width === 'desktop' ? (
                <Button onClick={this.toggleEmployeeView}>
                  {employeeView === 'all' ? 'My Shifts' : 'All Shifts'}
                </Button>
              ) : null}
            </div>
            <div>
              {width === 'desktop' ? (
                <Button onClick={this.toggleCalView}>
                  {view === 'week' ? 'Day View' : 'Week View'}
                </Button>
              ) : null}
            </div>
          </CalendarButtons>

          <div>
            <Suspense
              fallback={
                <div
                  style={{
                    display: 'flex',
                    flexFlow: 'column nowrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '4rem'
                  }}
                >
                  <Loader />
                </div>
              }
            >
              <DashCal
                events={events}
                names={names}
                min={hourRange.min}
                max={hourRange.max}
                view={view}
                eventPropGetter={event => ({
                  className: event.title.split(' ')[0]
                })}
                date={date}
              />
            </Suspense>
          </div>

          <div className="wrapper">
            <Card data-testid="employeeShifts"> 
              <div className="title">
                <h5>Your Upcoming Shifts</h5>
              </div>
              {/* returns all assigned shift dates and times for the user */}
              {employee && employee.shifts ? (
                <>
                  {employee.shifts.map(item => {
                    return <AssignedShifts {...item} key={item.id} />
                  })}
                </>
              ) : (
                <Message>
                  <p>You haven't been assigned a shift yet.</p>
                </Message>
              )}
            </Card>

            <Card className="tof-wrapper" data-testid="dashboardAvails">
              <div className="title">
                <h5>Your Weekly Availability</h5>
              </div>
              <Suspense
                fallback={<Message>Fetching your availabilities...</Message>}
              >
                {employee && employee.availabilities.length ? (
                  <Availability availabilities={employee.availabilities} />
                ) : (
                  <Message>You have no availabilities to display.</Message>
                )}
              </Suspense>
            </Card>

            <Card className="tof-wrapper" data-testid="time_off">
              <div className="title">
                <h5>Your Time Off Requests</h5>
                {employee && employee.time_off.length ? (
                  <Message>
                    <Suspense
                      fallback={<Message>Fetching your PTO...</Message>}
                    >
                      {employee.time_off.map(item => (
                        <TimeOffApproved
                          key={item.id}
                          status={item.status}
                          start={item.start}
                          reason={item.reason}
                          deleteExpiredRequest={() =>
                            this.deleteExpiredRequest(
                              item.id,
                              this.props.auth.token
                            )
                          }
                        />
                      ))}
                    </Suspense>
                  </Message>
                ) : (
                  <Message>No requests to display.</Message>
                )}
              </div>
            </Card>

            <Card>
              <div className="title">
                <h5>Request Time Off</h5>
              </div>
              <Suspense fallback={<Message>Loading...</Message>}>
                <TimeOffRequest />
              </Suspense>
            </Card>
          </div>
        </Container>
      </OuterContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    employee: state.employee.employee,
    error: state.error,
    auth: state.auth,
    employees: state.employees.employees,
    hours: state.hours.hours,
    user: state.auth.user,
    token: state.auth.token
  }
}

export default connect(
  mapStateToProps,
  {
    fetchSingleEmployeeFromDB,
    deleteTimeOffRequest,
    fetchHoursFromDB,
    fetchEmployeesFromDB
  }
)(EmployeeDashboard)

EmployeeDashboard.propTypes = {
  employee: propTypes.object,
  fetchSingleEmployeeFromDB: propTypes.func.isRequired,
  error: propTypes.string
}

const CalendarButtons = styled.div`
  padding: 20px 40px 0;
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media ${system.breakpoints[1]} {
    justify-content: center;
    padding: 20px 0 0;
  }
`
const NavButtons = styled.div`
  /* this creates internal margins between immediate children */
  & > * + * {
    margin-left: 10px;

    @media ${system.breakpoints[0]} {
      margin-left: 0;
    }
  }
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media ${system.breakpoints[0]} {
    justify-content: space-around;
  }
`
const ToggleButton = styled(Button)`
  @media ${system.breakpoints[1]} {
    margin-bottom: ${system.spacing.bigPadding};
    order: -1;
    width: 100%;
  }
`
