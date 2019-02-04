import React from 'react'
import App from '../App'
import { waitForElement } from 'react-testing-library'
import moment from 'moment'
import { renderWithReduxAndRouter, setupStripeNode } from '../../testing/utils'
import {
  structureEmployees,
  populateOrg
} from '../../../database/utils/generateData'
import * as axios from 'axios'
import * as firebase from 'firebase/app'
import { formatHours } from '../utils'

jest.mock('axios')
jest.mock('firebase/app')
jest.mock('firebase/auth')
jest.mock('react-ga')

// generates test data
const org = populateOrg({ size: 6 })
const { users } = org
const user = users.find(user => user.role === 'supervisor')
const { first_name, last_name, email } = user
const employees = structureEmployees(org)

describe('employee dashboard with redux', () => {
  it('can render with initial state', async () => {
    // mocks axios call so that we can control what data gets returned.
    // this is setting up the mock, so that when axios actually gets called
    // by the component, the test works appropriately.
    axios.get.mockImplementation(() => Promise.resolve({ data: employees }))

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

    // setup of document to play nice with Striple component
    setupStripeNode()

    // renders the App with both Redux and Router, with the route set
    // to the matching route for this component in App
    const {
      getByTestId,
      container,
      getByText,
      history
    } = renderWithReduxAndRouter(<App />, {
      route: `/employees`
    })

    // since axios and redux thunk are asyncronous, this waits for the page to
    // register changes from ComponentDidMount before proceeding with tests
    const testElement = await waitForElement(() => getByTestId('employee-card'))

    // uses test ids to assert expectations

    expect(container.textContent).toMatch(email)

    expect(container.textContent).toMatch(`${first_name} ${last_name}`)

    const timeR = employees.find(
      employee => employee.time_off_requests.length > 0
    ).time_off_requests
    expect(container.textContent).toMatch(
      moment(timeR[0].start)
        .local()
        .format('MM / DD')
    )

    const avails = employees.find(
      employee => employee.availabilities.length > 0
    )
  })
})
