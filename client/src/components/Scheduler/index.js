import React from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import DropCal from './DropCal'
import EmployeePool from './EmployeePool'
import { fetchEmployeesFromDB, createEvent, changeEvent } from '../../actions'
import OuterContainer from '../common/OuterContainer'
import WeekSummary from './WeekSummary'
import BreadCrumb from '../BreadCrumb'
import LeftSideBar from '../LeftSideBar'

class Scheduler extends React.Component {
  state = { events: [] }

  componentDidMount() {
    this.props.fetchEmployeesFromDB()
  }

  handleDrop = drop => {
    console.log('drop', drop)
    const { event, start, end } = drop
    const { type, ...employee } = event

    // checks to see if this is the creation of a new_shift via an employee card
    // being dragged, rather than an existing event being dragged
    if (event.type === 'new_shift') {
      return this.props.createEvent({ employee, start })
    }

    // else, the drop is from dragging an existing shift, so it is interpreted
    // as a change
    return this.props.changeEvent({ event: employee, changes: { start, end } })
  }

  resizeEvent = ({ end, start, event }) => {
    this.props.changeEvent({ event, changes: { start, end } })
  }

  render() {
    const { employees } = this.props

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

    return (
      <OuterContainer>
        <LeftSideBar />
        <BreadCrumb location="Schedule" />
        {/* DO NOT REMOVE THE LEFTSIDEBAR AND BREADCRUMB COMPONENTS - THEY NEED TO BE HERE */}
        <div style={{ display: 'flex' }}>
          <EmployeePool employees={employees} />
          <div style={{ display: 'flex', flexFlow: 'column', width: '100%' }}>
            <DropCal
              events={events}
              eventPropGetter={event => ({
                className: event.title.split(' ')[0]
              })}
              names={names}
              onEventDrop={this.handleDrop}
              onEventResize={this.resizeEvent}
              onSelectEvent={event => console.log(event)}
            />
            <WeekSummary events={events} />
          </div>
        </div>
      </OuterContainer>
    )
  }
}

const mapStateToProps = ({ employees }) => ({ employees: employees.employees })

const DragSched = DragDropContext(HTML5Backend)(Scheduler)
export default connect(
  mapStateToProps,
  { fetchEmployeesFromDB, createEvent, changeEvent }
)(DragSched)
