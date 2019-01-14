import React from 'react'
import { Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { render, waitForElement } from 'react-testing-library'
import { renderWithReduxAndRouter } from '../../testing/utils'
import EmployeeDashboard from '../components/EmployeeDashboard'
import { fetchSingleEmployeefromDB } from '../actions'
import * as axios from 'axios'

jest.mock('axios')

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
    axios.get.mockImplementation(() => Promise.resolve({ data: employee }))

    const { getByTestId, getByText, history } = renderWithReduxAndRouter(
      <Route path="/dashboard/:id" component={EmployeeDashboard} />,
      {
        route: `/dashboard/${employee.id}`
      }
    )
    const testElement = await waitForElement(() => getByTestId('date'))
    expect(getByTestId('date').textContent).toBe(employee.time_off[0].date)
    expect(getByTestId('reason').textContent).toBe(employee.time_off[0].reason)
  })
})
