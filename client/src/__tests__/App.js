import React from 'react'
import { render, waitForElement } from 'react-testing-library'
import { renderWithReduxAndRouter, setupStripeNode } from '../../testing/utils'
import App from '../App'
import axios from 'axios'
import * as ReactGA from 'react-ga'
import * as firebase from 'firebase/app'
// this import style is required for proper codesplitting of firebase

jest.mock('axios')
jest.mock('firebase/app')
jest.mock('firebase/auth')
jest.mock('react-ga')

describe('App component', () => {
  it('renders hello', async () => {
    setupStripeNode()

    firebase.auth = jest.fn().mockReturnValue({
      onAuthStateChanged: cb => () => cb()
    })

    // Render
    const { getByText } = renderWithReduxAndRouter(<App />, { route: '/' })

    const cadence = await waitForElement(() => getByText(/cadence/i))

    // Assert
    expect(cadence).toBeDefined()
  })

  // below commented out as components have changed
  // it('routes to calendar on link click', () => {
  //   const { getByText, container } = renderWithRouter(<App />)
  //   const leftClick = { button: 0 }
  //   fireEvent.click(getByText(/calendar/i), leftClick)
  //   expect(container.innerHTML).toMatch('Calendar')
  // })
  // it('routes to Employees on link click', () => {
  //   const { getByText, container } = renderWithRouter(<App />)
  //   const leftClick = { button: 0 }
  //   fireEvent.click(getByText(/employees/i), leftClick)
  //   expect(container.innerHTML).toMatch('Employees')
  // })
  // it('routes to Create Schedule on link click', () => {
  //   const { getByText, container } = renderWithRouter(<App />)
  //   const leftClick = { button: 0 }
  //   fireEvent.click(getByText(/schedule/i), leftClick)
  //   expect(container.innerHTML).toMatch('Schedule')
  // })
  // it('routes to Settings on link click', () => {
  //   const { getByText, container } = renderWithRouter(<App />)
  //   const leftClick = { button: 0 }
  //   fireEvent.click(getByText(/settings/i), leftClick)
  //   expect(container.innerHTML).toMatch('Settings')
  // }) // settings commented out (not built yet)
})
