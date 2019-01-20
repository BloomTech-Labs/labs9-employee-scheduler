import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { renderWithReduxAndRouter } from '../../testing/utils'
import App from '../App'
import axios from 'axios'
import * as firebase from 'firebase/app'
// this import style is required for proper codesplitting of firebase

jest.mock('axios')
jest.mock('firebase/app')
jest.mock('firebase/auth')

describe('App component', () => {
  it('renders hello', () => {
    // SETUP
    // mock setup
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: { message: 'hello!' } })
    )
    firebase.auth = jest.fn().mockReturnValue({
      onAuthStateChanged: cb => () => cb()
    })
    // provide stripejs node in head element to play nice with async stripe loading
    // note, this is a form of mocking out stripe
    const stripejs = document.createElement('script')
    stripejs.id = 'stripe-js'
    document.head.appendChild(stripejs)

    const { getByText } = renderWithReduxAndRouter(<App />)

    expect(getByText('Cadence')).toBeInTheDocument()
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
