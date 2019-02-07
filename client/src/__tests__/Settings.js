import React from 'react'
import App from '../App'
import { populateOrg } from '../../../database/utils/generateData'
import { fireEvent, waitForElement, cleanup } from 'react-testing-library'
import { renderWithReduxAndRouter, setupStripeNode } from '../../testingUtils'
import Settings from '../views/Settings'

import * as axios from 'axios'
import * as firebase from 'firebase/app'
import * as ReactGA from 'react-ga'
jest.mock('axios')
jest.mock('firebase/app')
jest.mock('firebase/auth')
jest.mock('react-ga')

const { organization, users } = populateOrg({ size: 6 })
const user = users[0]

describe('Settings Component', () => {
  afterEach(cleanup)
  let email, phone, emailpref, phonepref, utils
  beforeEach(() => {
    // mock out firebase auth
    firebase.auth = jest.fn().mockImplementation(() => {
      return {
        onAuthStateChanged: cb => {
          cb()
          return () => { }
        },
        currentUser: {
          getIdToken: () => Promise.resolve('token')
        }
      }
    })

    // mock out axios authenticaton call to our server
    axios.get.mockImplementation((path, { headers: { authorization } }) => {
      if (authorization === 'token') {
        if (path.match(new RegExp(`/organizations/${organization.id}`))) {
          return Promise.resolve({ data: organization })
        }
        if (path.match(new RegExp(`/users/current`))) {
          return Promise.resolve({ data: user })
        }
      }
    })
    // setup of document to play nice with Striple component
    setupStripeNode()

    // renders the App with both Redux and Router, with the route set
    // to the matching route for this component in App
    utils = renderWithReduxAndRouter(<App />, {
      route: `/settings`
    })
  })
  it('should render the settings header', async () => {
    const { getByTestId } = utils
    const settings = await waitForElement(() => {
      return getByTestId('settings')
    })
    expect(settings.textContent).toMatch(user.first_name)
  })
  it('should take in an email input value', async () => {
    const email = await waitForElement(() => {
      return utils.getByLabelText(/email/i)
    })
    fireEvent.change(email, { target: { value: 'carlos@coolguy.com' } })
    expect(email.value).toBe('carlos@coolguy.com')
  })
  it('should take a phone number with number values to state', async () => {
    const phone = await waitForElement(() => {
      return utils.getByLabelText(/phone/i)
    })
    fireEvent.change(phone, { target: { value: '999999999' } })
    expect(phone.value).toBe('999999999')
  })
  it('should take in an emailpref input value', async () => {
    const emailpref = await waitForElement(() => {
      return utils.getByLabelText(/emailpref/i)
    })
    fireEvent.change(emailpref, { target: { value: 'carlos@coolguy.com' } })
    expect(emailpref.value).toBe('carlos@coolguy.com')
  })
  it('should take a phonepref number values to state', async () => {
    const phonepref = await waitForElement(() => {
      return utils.getByLabelText(/phonepref/i)
    })
    fireEvent.change(phonepref, { target: { value: '999999999' } })
    expect(phonepref.value).toBe('999999999')
  })
})
