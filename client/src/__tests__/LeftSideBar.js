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
const { users } = org
const user = users.find(user => user.role === 'supervisor')
const { first_name, last_name, email } = user
const employees = structureEmployees(org) //makes an array of employee objects

describe('Left Sidebar with redux', () => {
  it('displays and functions when user is logged in', async () => {
    setupStripeNode()
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
    const {
      getByTestId,
      container,
      getByText,
      history
    } = renderWithReduxAndRouter(<App />, {
      route: `/employees`
    })

    const hamburger = await waitForElement(() => getByTestId('hamburger'))
    expect(hamburger).toBeDefined()
    const leftClick = { button: 0 }
    //clicks on hamburger menu
    fireEvent.click(hamburger, leftClick)
    const nav = await waitForElement(() => getByTestId('nav'))
    expect(nav).toBeDefined()
    fireEvent.click(getByText(/dashboard/i), leftClick)
    expect(container.innerHTML).toMatch(/employee dashboard/i)
  })

  it('not displayed on landing page', async () => {
    setupStripeNode()
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
})
