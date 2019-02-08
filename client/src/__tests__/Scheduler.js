import React from 'react'
import { waitForElement, cleanup } from 'react-testing-library'
import { renderWithReduxAndRouter, setupStripeNode } from '../../testingUtils'
import App from '../App'
import {
  populateOrg,
  structureEmployees
} from '../../../database/utils/generateData'
import * as axios from 'axios'
import * as firebase from 'firebase/app'
jest.mock('firebase/app')
jest.mock('firebase/auth')

jest.mock('axios')
jest.mock('firebase/app')
jest.mock('firebase/auth')
jest.mock('react-ga')

// generate org with table structure
const org = populateOrg({ size: 4 })

// convert into nested employee data structure
const employees = structureEmployees(org)
const { users, events, hours, organization } = org
const user = users.find(user => user.role === 'owner')
user.cal_visit = false

// find an employee who is scheduled
const scheduledEmployee = employees.find(
  employee => employee.id === events[0].user_id
)
const scheduledName = `${scheduledEmployee.first_name} ${
  scheduledEmployee.last_name
}`

describe('Scheduler', () => {
  afterEach(cleanup)
  it('renders with employee data', async () => {
    // setup of document to play nice with Stripe component
    setupStripeNode()

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
    // mocks axios call so that we can control what data gets returned.
    // this is setting up the mock, so that when axios actually gets called
    // by the component, the test works appropriately.
    axios.get.mockImplementation((path, { headers: { authorization } }) => {
      if (authorization === 'token') {
        if (path.match(new RegExp(`/employees/${user.organization_id}`))) {
          return Promise.resolve({ data: employees })
        }
        if (
          path.match(new RegExp(`/hours-of-operation/${user.organization_id}`))
        ) {
          return Promise.resolve({ data: hours })
        }
        if (path.match(new RegExp(`/organizations/${user.organization_id}`))) {
          return Promise.resolve({ data: organization })
        }
        if (path.match(new RegExp(`/users/current`))) {
          return Promise.resolve({ data: user })
        }
      }
    })

    // renders the component with both Redux and Router, with the route set
    // to the matching route for this component in App
    const {
      getByTestId,
      getByText,
      history,
      container
    } = renderWithReduxAndRouter(<App />, { route: '/shift-calendar' })

    // since axios and redux thunk are asyncronous, this waits for the page to
    // register changes from ComponentDidMount before proceeding with tests
    const testElement = await waitForElement(() => getByText(scheduledName))

    // uses test ids to assert expectations
    expect(testElement.textContent).toBeDefined()

    const cal = await waitForElement(() =>
      container.querySelector('.rbc-calendar')
    )

    expect(cal.textContent).toMatch(scheduledName)
  })
})
