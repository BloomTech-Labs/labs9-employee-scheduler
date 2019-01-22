import React from 'react'
import App from '../App'
import { fireEvent, waitForElement } from 'react-testing-library'
import { renderWithReduxAndRouter, setupStripeNode } from '../../testing/utils'
import Settings from '../components/Settings'

import * as axios from 'axios'
import * as firebase from 'firebase/app'
jest.mock('axios')
jest.mock('firebase/app')
jest.mock('firebase/auth')

const user = {
  id: 'xsc44X6okFgw3V2OPIIcGIMXkkz1',
  organization_id: '9126df31-2607-4166-9c0c-d0a300c59c62',
  first_name: 'Chasity',
  last_name: 'Gerhold',
  role: 'employee',
  email: 'test2@test.com',
  phone: '325-317-5476 x405',
  emailpref: true,
  phonepref: false
}

describe('Settings Component', () => {
  let email, phone, emailpref, phonepref, utils
  beforeEach(() => {
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
    utils = renderWithReduxAndRouter(<App />, {
      route: `/settings`
    })
  })
  it('should render the settings header', async () => {
    const { getByTestId } = utils
    const settings = await waitForElement(() => {
      return getByTestId('settings')
    })
    expect(settings.textContent).toBe('Settings')
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
