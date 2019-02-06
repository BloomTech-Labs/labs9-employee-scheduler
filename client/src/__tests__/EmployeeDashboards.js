import React from 'react'
import { waitForElement } from 'react-testing-library'
import { renderWithReduxAndRouter, setupStripeNode } from '../../testing/utils'
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
user.cal_visit = true
user.emp_visit = true

describe('employee dashboard with redux', () => {
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

    // mock out axios authenticaton call to our server
    axios.post.mockImplementation(
      (path, body, { headers: { authorization } }) => {
        if (authorization === 'token') {
          return Promise.resolve({ data: user })
        }
      }
    )

    axios.get.mockImplementation((path, { headers: { authorization } }) => {
      if (authorization === 'token') {
        if (path.match(new RegExp(`/dashboard/${user.id}`))) {
          const { time_off_requests, events, ...rest } = employee
          return Promise.resolve({
            data: { ...rest, time_off: time_off_requests, shifts: events }
          })
        }
        if (path.match(new RegExp(`/employees/${user.organization_id}`))) {
          console.log('employees hits')
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

    //testing to make sure dates are in the right format for shifts
    const date = moment
      .utc(shift.start)
      .local()
      .format('MMM Do')
    expect(getByTestId('employeeShifts').textContent).toMatch(date)

    //testing calendar to make sure a name is rendering
    const scheduledName = employee.last_name

    const cal = await waitForElement(() =>
      container.querySelector('.rbc-calendar')
    )

    expect(cal.textContent).toMatch(scheduledName)

    //testing to make sure time off requests are in the right format
    const timeOff = await waitForElement(() => getByTestId('time_off'))
    const reqTime = moment
      .utc(employee.time_off_requests[0].start)
      .local()
      .format('MM / DD')
    expect(getByTestId('time_off_format').textContent).toMatch(reqTime)

    console.log(employee.time_off_requests[0].start)
  })
})
