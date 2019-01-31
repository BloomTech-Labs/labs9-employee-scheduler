import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import DropCal from './DropCal'
import EmployeePool from './EmployeePool'
import CoverageBadge from './CoverageBadge'
import Button from '../common/Button'
import styled from '@emotion/styled'
import system from '../../design/theme'
import axios from 'axios'
import {
  fetchEmployeesFromDB,
  fetchHoursFromDB,
  createEvent,
  changeEvent,
  deleteEvent,
  displayCoverage
} from '../../actions'
import {
  getHoursOfOperationRange,
  getRange,
  calculateCoverage,
  validateShift
} from '../../utils'
import ReactJoyride, { STATUS, EVENTS, ACTIONS } from 'react-joyride'
import steps from './Demo/calendar'
import WeekSummary from './WeekSummary'
import axios from 'axios'

const MEDIUM_BP = Number.parseInt(system.breakpoints[1].split(' ')[1])
const SMALL_BP = Number.parseInt(system.breakpoints[0].split(' ')[1])
const baseURL = process.env.REACT_APP_SERVER_URL

class Scheduler extends React.Component {
  state = {
    draggedEmployee: null,
    width: 'desktop',
    view: 'week',
    date: new Date(),
    range: getRange({ view: 'week', date: new Date() }),
    run: false,
    //react joyride demo steps
    steps: undefined, //check demo folder for steps
    stepIndex: 0
  }

  componentDidMount() {
    // LINES 50 to 58 should use REDUX!
    const baseURL = process.env.REACT_APP_SERVER_URL
    axios.post(
      `${baseURL}/employees/${this.props.user.organization_id}`,
      null,
      {
        headers: { authorization: this.props.token }
      }
    )

    this.fetchData()
    this.updateWidth()
    window.addEventListener('resize', this.updateWidth)

    const { user } = this.props
    // load the demo steps
    if (steps) this.setState({ steps })
    // check if the user has completed the demo before
    if (user && user.cal_visit === true) this.setState({ run: true })
  }

  componentDidUpdate() {
    if (this.props.employees && this.props.hours) {
      this.getScheduleCoverage()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth)
  }

  fetchData() {
    const { organization_id } = this.props.user
    this.props.fetchEmployeesFromDB(organization_id, this.props.token)
    this.props.fetchHoursFromDB(organization_id, this.props.token)
  }

  updateWidth = () => {
    const width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    )

    if (Number.parseInt(width) < SMALL_BP) {
      return this.setState({
        width: 'mobile',
        view: 'day',
        range: getRange({ view: 'day', date: this.state.date })
      })
    } else if (Number.parseInt(width) < MEDIUM_BP) {
      return this.setState({
        width: 'tablet',
        view: 'day',
        range: getRange({ view: 'day', date: this.state.date })
      })
    } else {
      return this.setState({
        width: 'desktop',
        view: 'week',
        range: getRange({ view: 'week', date: this.state.date })
      })
    }
  }

  toggleView = () => {
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

  getScheduleCoverage = () => {
    const { hours, employees } = this.props
    const { view, date } = this.state
    const coverage = calculateCoverage({ hours, employees, view, date })
    this.props.displayCoverage(coverage)
  }

  validateEvent = ({ userId, eventTimes }) => {
    const { hours, employees } = this.props
    const employee = employees.filter(({ id }) => id === userId)[0]

    // checks whether event is in compliance with all shift requirements,
    // such as no conflicts with time_off_requests, availabilities, or hours_of_operation
    return validateShift({ eventTimes, hours, employee })
  }

  moveEvent = drop => {
    const { event, start, end } = drop
    const { type, ...employee } = event
    const { verdict, message } = this.validateEvent({
      userId: employee.user_id,
      eventTimes: { start, end }
    })
    if (verdict) {
      this.props.changeEvent(
        { event: employee, changes: { start, end } },
        this.props.token
      )
    } else {
      window.alert(message)
    }
  }

  resizeEvent = ({ end, start, event }) => {
    const { verdict, message } = this.validateEvent({
      userId: event.user_id,
      eventTimes: { start, end }
    })
    if (verdict) {
      this.props.changeEvent(
        { event, changes: { start, end } },
        this.props.token
      )
    } else {
      window.alert(message)
    }
  }

  createEvent = ({ start, end }) => {
    const { draggedEmployee } = this.state
    if (draggedEmployee) {
      const { verdict, message } = this.validateEvent({
        userId: draggedEmployee.id,
        eventTimes: { start, end }
      })
      if (verdict) {
        this.props.createEvent(
          { employee: draggedEmployee, start },
          this.props.token
        )
        this.setState({ draggedEmployee: null })
      } else {
        window.alert(message)
      }
    }
  }

  deleteEvent = event => {
    const { title, start, end } = event
    const eventText = `${title}
    Begin: ${moment(start).format('ddd, MMMM Do, h:mm a')}
    End: ${moment(end).format('ddd, MMMM Do, h:mm a')}
    `
    const r = window.confirm(
      'Would you like to unschedule this shift?\n\n' + eventText
    )

    if (r) {
      return this.props.deleteEvent(event, this.props.token)
    }
  }

  validateDrop = (date, more) => {
    const { draggedEmployee: employee } = this.state
    if (employee) {
      const { hours } = this.props
      const eventTimes = {
        start: date,
        end: new Date(date.getTime() + 60 * 1000 * 60)
      }
      const { verdict } = validateShift({ eventTimes, hours, employee })
      if (verdict === false) {
        return {
          style: { boxShadow: `inset 0 0 15px ${system.color.hoverDanger}` }
        }
      }
    }
  }

  // for joyride demo
  handleClickStart = e => {
    e.preventDefault()
    this.setState({
      run: true,
      stepIndex: 0
    })
  }

  // joyride event handling, step index controls the position of the event
  handleJoyrideCallback = data => {
    const { action, index, type, status } = data
    const { user } = this.props
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      this.setState({ run: false, stepIndex: 0 })
      axios
        .put(
          `${baseURL}/users/${user.id}`,
          { cal_visit: false },
          {
            headers: { authorization: this.props.token }
          }
        )
        .then(res => {
          res.json(res.data)
        })
        .catch(err => console.log(err))
    } else if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      const stepIndex = index + (action === ACTIONS.PREV ? -1 : 1)

      if (index === 0) {
        setTimeout(() => {
          this.setState({ run: true })
        }, 400)
      } else if (index === 1) {
        this.setState(
          {
            run: false,
            stepIndex
          },
          () => {
            setTimeout(() => {
              this.setState({ run: true })
            }, 400)
          }
        )
      } else if (index === 2 && action === ACTIONS.PREV) {
        this.setState(
          {
            run: false,
            stepIndex
          },
          () => {
            setTimeout(() => {
              this.setState({ run: true })
            }, 400)
          }
        )
      } else {
        // Update state to advance the tour
        this.setState({
          stepIndex
        })
      }
    }
  }

  updateDragState = (draggedEmployee = null) =>
    this.setState({ draggedEmployee })

  render() {
    const { employees, hours, coverage } = this.props
    const { width, range, view, date } = this.state
    const names = []
    employees.map(employee => names.push(`${employee.first_name}`))

    const events = employees.reduce((acc, employee) => {
      return [
        ...acc,
        ...employee.events.map(event => {
          return {
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
            title: `${employee.first_name} ${employee.last_name}`
          }
        })
      ]
    }, [])
    let hourRange = getHoursOfOperationRange(hours)
    const { run, steps } = this.state
    return (
      <Container>
        <ReactJoyride
          callback={this.handleJoyrideCallback}
          continuous
          run={run}
          scrollToFirstStep
          showProgress
          showSkipButton
          steps={steps}
          styles={{
            options: {
              zIndex: 10000
            }
          }}
        />
        {width !== 'mobile' ? (
          <EmployeePool
            employees={employees}
            updateDragState={this.updateDragState}
          />
        ) : null}
        <CalendarContainer>
          <TopButtons>
            <CoverageBadge coverage={coverage} />
            {width === 'desktop' ? (
              <Button onClick={this.handleClickStart}>Start Tutorial </Button>
            ) : null}
            <ModalButton onClick={this.props.toggleModal} id="HOO">
              Edit Hours of Operation
            </ModalButton>
          </TopButtons>
          <CalendarButtons>
            <NavButtons>
              <Button onClick={() => this.changeDate('left')}>&#8592;</Button>
              <Button onClick={() => this.changeDate('today')}>Today</Button>
              <Button onClick={() => this.changeDate('right')}>&#8594;</Button>
            </NavButtons>
            <div>
              {width === 'desktop' ? (
                <Button onClick={this.toggleView}>
                  {this.state.view === 'week' ? 'Day View' : 'Week View'}
                </Button>
              ) : null}
            </div>
          </CalendarButtons>
          <DropCal
            popover
            events={events}
            eventPropGetter={event => ({
              className: event.title.split(' ')[0]
            })}
            names={names}
            updateDragState={this.updateDragState}
            onEventDrop={this.moveEvent}
            onEventResize={this.resizeEvent}
            onSelectSlot={this.createEvent}
            onSelectEvent={this.deleteEvent}
            min={hourRange.min}
            max={hourRange.max}
            view={view}
            date={date}
            slotPropGetter={this.validateDrop}
          />
          <WeekSummary range={range} events={events} />
        </CalendarContainer>
      </Container>
    )
  }
}

const mapStateToProps = ({ employees, hours, auth, coverage }) => ({
  employees: employees.employees,
  hours: hours.hours,
  user: auth.user,
  token: auth.token,
  coverage: coverage
})

const DragSched = DragDropContext(HTML5Backend)(Scheduler)
export default connect(
  mapStateToProps,
  {
    fetchEmployeesFromDB,
    fetchHoursFromDB,
    createEvent,
    changeEvent,
    deleteEvent,
    displayCoverage
  }
)(DragSched)

const Container = styled.div`
  display: flex;

  @media ${system.breakpoints[0]} {
    flex-direction: column;
  }
`

const CalendarContainer = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1 1;
`

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

const TopButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 40px 0;
  @media ${system.breakpoints[1]} {
    padding: 10px 0 0;
  }
`

const ModalButton = styled(Button)`
  position: relative;
  z-index: 14;
`

const NavButtons = styled.div`
  /* this creates internal margins between immediate children */
  & > * + * {
    margin-left: 10px;
  }
`
