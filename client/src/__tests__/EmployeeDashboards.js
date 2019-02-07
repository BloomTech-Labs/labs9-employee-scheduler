import React from 'react'
import { waitForElement, cleanup } from 'react-testing-library'
import { renderWithReduxAndRouter, setupStripeNode } from '../../testingUtils'
import { utcDayToLocal, decrementDay, formatHours } from '../utils'
import App from '../App'
import * as axios from 'axios'
import * as firebase from 'firebase/app'
import {
  structureEmployees,
  populateOrg
} from '../../../database/utils/generateData'
import moment from 'moment'
jest.mock('firebase/app')
jest.mock('firebase/auth')

jest.mock('axios')
jest.mock('firebase/app')
jest.mock('firebase/auth')
jest.mock('react-ga')

// this is the mocked data to be returned
const org = populateOrg({ size: 4 })
const { users, hoursOfOperation, organization } = org
const employees = structureEmployees(org)
const employeeCandidates = users.filter(user => user.role !== 'owner')
// find an employee who is not an owner and has time off requests
const employee = employees.find(
  candidate =>
    candidate.time_off_requests.length > 0 &&
    employeeCandidates.find(nonOwner => nonOwner.id === candidate.id)
)

const user = employeeCandidates.find(nonOwner => nonOwner.id === employee.id)
user.cal_visit = false
user.emp_visit = false
console.log(employee.events[0].start)
describe('employee dashboard with redux', () => {
  afterEach(cleanup)
  it('can render with initial state', async () => {
    // mock out firebase auth
    firebase.auth = jest.fn().mockImplementation(() => {
      return {
        onAuthStateChanged: cb => {
          cb()
          return () => {}
        },
        currentUser: {
          getIdToken: () => Promise.resolve('token')
        }
      }
    })

    axios.get.mockImplementation((path, { headers: { authorization } }) => {
      if (authorization === 'token') {
        if (path.match(new RegExp(`/users/current`))) {
          return Promise.resolve({ data: user })
        }
        if (path.match(new RegExp(`/dashboard/`))) {
          const { time_off_requests, events, ...rest } = employee
          return Promise.resolve({
            data: { ...rest, time_off: time_off_requests, shifts: events }
          })
        }
        if (path.match(new RegExp(`/employees/${user.organization_id}`))) {
          return Promise.resolve({ data: employees })
        }
        if (
          path.match(new RegExp(`/hours-of-operation/${user.organization_id}`))
        ) {
          return Promise.resolve({ data: hoursOfOperation })
        }
        if (path.match(new RegExp(`/organizations/${user.organization_id}`))) {
          return Promise.resolve({ data: organization })
        }
        return Promise.resolve({})
      }
    })

    // setup of document to play nice with Striple component
    setupStripeNode()

    // renders the App with both Redux and Router, with the route set
    // to the matching route for this component in App
    const {
      getByTestId,
      getByText,
      getAllByTestId,
      history,
      container
    } = renderWithReduxAndRouter(<App />, {
      route: `/dashboard/${employee.id}`
    })

    // since axios and redux thunk are asyncronous, this waits for the page to
    // register changes from ComponentDidMount before proceeding with tests
    const testElement = await waitForElement(() => getByTestId('time_off'))

    // uses test ids to assert expectations
    expect(testElement.textContent).toMatch(
      moment
        .utc(employee.time_off_requests[0].start)
        .local()
        .format('MM / DD')
    )
    expect(testElement.textContent).toMatch(
      employee.time_off_requests[0].reason
    )

    const shiftElement = await waitForElement(() => getByTestId('shift'))
    const shift = employee.events[0]
    const shiftTime = `${moment
      .utc(shift.start)
      .local()
      .format('h:mm a')} - ${moment
      .utc(shift.end)
      .local()
      .format('h:mm a')}`
    expect(getByTestId('employeeShifts').textContent).toMatch(shiftTime)

    // testing to make sure dates are in the right format for shifts
    const date = moment
      .utc(shift.start)
      .local()
      .format('MMM Do')
    expect(getByTestId('employeeShifts').textContent).toMatch(date)

    // testing calendar to make sure a name is rendering
    const scheduledName = employee.last_name

    const cal = await waitForElement(() =>
      container.querySelector('.rbc-calendar')
    )

    expect(cal.textContent).toMatch(scheduledName)

    // testing to make sure time off requests are in the right format
    const timeOff = await waitForElement(() => getByTestId('time_off'))
    const reqTime = moment
      .utc(employee.time_off_requests[0].start)
      .local()
      .format('MM / DD')
    expect(getByTestId('time_off_format').textContent).toMatch(reqTime)

    // testing to see if upcoming shifts are in the right format
    await waitForElement(() => getByTestId('shift_day'))
    const shiftDay = moment
      .utc(employee.events[0].start)
      .local()
      .format('MMM Do')
    expect(getByTestId('shift_day').textContent).toMatch(shiftDay)
    await waitForElement(() => getByTestId('shift_time'))

    const shiftStartTime = moment
      .utc(employee.events[0].start)
      .local()
      .format('h:mm a')
    expect(getByTestId('shift_time').textContent).toMatch(shiftStartTime)

    // expect(container).toBe(null)

    // testing to make sure availabilities are visible
    const avails = await waitForElement(() =>
      getAllByTestId('availability_day')
    )

    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]

    employee.availabilities.forEach(avail => {
      const dayNum = utcDayToLocal({ day: avail.day, time: avail.start_time })
      const dayName = dayNames[dayNum]
      const start = formatHours(avail.start_time)
      const end = formatHours(avail.end_time)

      const dateString = avail.off ? 'unavailable' : `${start} - ${end}`

      expect(avails[dayNum].textContent).toMatch(dayName)
      expect(avails[dayNum].textContent).toMatch(dateString)
    })
  })
})
