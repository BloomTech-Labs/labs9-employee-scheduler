import React from 'react'
import App from '../App'
import { waitForElement, fireEvent } from 'react-testing-library'
import moment from 'moment'
import { renderWithReduxAndRouter, setupStripeNode } from '../../testing/utils'
import {
  structureEmployees,
  populateOrg
} from '../../../database/utils/generateData'
import * as axios from 'axios'
import * as firebase from 'firebase/app'
import * as ReactGA from 'react-ga'

jest.mock('axios')
jest.mock('firebase/app')
jest.mock('firebase/auth')
jest.mock('react-ga')

// generates test data
const org = populateOrg({ size: 6 })
const { users, organization } = org
const user = users.find(user => user.role === 'owner')
user.cal_visit = false
user.emp_visit = false
const { first_name, last_name, email } = user
const employees = structureEmployees(org) //makes an array of employee objects

describe('Left Sidebar with redux', () => {
  it('not displayed on landing page', async () => {
    setupStripeNode()
    // mocks axios call so that we can control what data gets returned.
    // this is setting up the mock, so that when axios actually gets called
    // by the component, the test works appropriately.
    axios.get.mockImplementation((path, { headers: { authorization } }) => {
      if (authorization === 'token') {
        if (path.match(new RegExp(`/users/current`))) {
          return Promise.resolve({ data: user })
        }
        if (path.match(new RegExp(`/employees/${organization.id}`))) {
          return Promise.resolve({ data: employees })
        }
        if (path.match(new RegExp(`/organizations/${organization.id}`))) {
          return Promise.resolve({ data: organization })
        }
      }
    })

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

    const {
      getByTestId,
      container,
      getByText,
      history,
      queryByTestId
    } = renderWithReduxAndRouter(<App />, {
      route: `/`
    })

    await waitForElement(() => getByText(/cadence/i))

    expect(queryByTestId('hamburger')).toBeNull()
  })
  it('displays and functions when user is logged in', async () => {
    setupStripeNode()
    // mocks axios call so that we can control what data gets returned.
    // this is setting up the mock, so that when axios actually gets called
    // by the component, the test works appropriately.
    // mock out axios authenticaton call to our server
    axios.get.mockImplementation((path, { headers: { authorization } }) => {
      if (authorization === 'token') {
        if (path.match(new RegExp(`/users/current`))) {
          return Promise.resolve({ data: user })
        }
        if (path.match(new RegExp(`/employees/${organization.id}`))) {
          return Promise.resolve({ data: employees })
        }
        if (path.match(new RegExp(`/organizations/${organization.id}`))) {
          return Promise.resolve({ data: organization })
        }
      }
    })

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

    const {
      getByTestId,
      container,
      getByText,
      history
    } = renderWithReduxAndRouter(<App />, {
      route: `/settings`
    })

    const hamburger = await waitForElement(() => getByTestId('hamburger'))
    expect(hamburger).toBeDefined()
    const leftClick = { button: 0 }
    //clicks on hamburger menu
    fireEvent.click(hamburger, leftClick)
    const nav = await waitForElement(() => getByTestId('nav'))
    expect(nav).toBeDefined()
    fireEvent.click(getByText(/billing/i), leftClick)
    expect(container.innerHTML).toMatch(/billing/i)
  })
})
