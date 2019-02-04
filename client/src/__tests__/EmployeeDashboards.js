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
const { users } = org
const user = users.find(user => user.role !== 'owner')
const employees = structureEmployees(org)
const employee = employees.find(employee => employee.id === user.id)

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
        const { time_off_requests, ...rest } = employee
        return Promise.resolve({
          data: { ...rest, time_off: time_off_requests }
        })
      }
    })

    // setup of document to play nice with Striple component
    setupStripeNode()

    // renders the App with both Redux and Router, with the route set
    // to the matching route for this component in App
    const { getByTestId, getByText, history } = renderWithReduxAndRouter(
      <App />,
      {
        route: `/dashboard/${employee.id}`
      }
    )

    // since axios and redux thunk are asyncronous, this waits for the page to
    // register changes from ComponentDidMount before proceeding with tests
    const testElement = await waitForElement(() => getByTestId('time_off'))

    // uses test ids to assert expectations
    expect(testElement.textContent).toMatch(
      moment(employee.time_off_requests[0].start)
        .local()
        .format('MM / DD')
    )
    expect(testElement.textContent).toMatch(
      employee.time_off_requests[0].reason
    )
  })
})
