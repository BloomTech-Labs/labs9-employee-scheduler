import React from 'react'
import { Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { render, waitForElement } from 'react-testing-library'
import { renderWithReduxAndRouter } from '../../testing/utils'
import EmployeeDashboard from '../components/EmployeeDashboard'
import { fetchSingleEmployeefromDB } from '../actions'
import * as axios from 'axios'

jest.mock('axios')

// this is the mocked data to be returned
const employee = {
  id: '89ee112d-b517-4822-996d-392c079a86c5',
  first_name: 'Loyce',
  last_name: 'Koepp',
  shifts: [
    {
      id: '67cb8ca8-8de1-420e-ba26-dc3ae1ebb84a',
      day: 'Monday',
      time: '0am-3pm'
    }
  ],
  time_off: [
    {
      id: '1624a6a1-ab6a-4517-9fca-38b4ae36feb9',
      date: '2019-01-20',
      status: 'confirmed',
      reason: 'Consectetur odio nisi.'
    }
  ]
}

describe('employee dashboard with redux', () => {
  it('can render with initial state', async () => {
    // mocks axios call so that we can control what data gets returned.
    // this is setting up the mock, so that when axios actually gets called
    // by the component, the test works appropriately.
    axios.get.mockImplementation(() => Promise.resolve({ data: employee }))

    // renders the component with both Redux and Router, with the route set
    // to the matching route for this component in App
    const { getByTestId, getByText, history } = renderWithReduxAndRouter(
      <Route path="/dashboard/:id" component={EmployeeDashboard} />,
      {
        route: `/dashboard/${employee.id}`
      }
    )

    // since axios and redux thunk are asyncronous, this waits for the page to
    // register changes from ComponentDidMount before proceeding with tests
    const testElement = await waitForElement(() => getByTestId('date'))

    // uses test ids to assert expectations
    expect(getByTestId('date').textContent).toBe(employee.time_off[0].date)
    expect(getByTestId('reason').textContent).toBe(employee.time_off[0].reason)
  })
})

