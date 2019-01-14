import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-testing-library'
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
  it('can render with initial state', () => {
    axios.mockImplementation(() => Promise.resolve({ data: employee }))

    const { getByTestId, getByText, history } = renderWithReduxAndRouter(
      <EmployeeDashboard />,
      undefined,
      {
        route: `/dashboard/${employee.id}`
      }
    )

    expect(getByTestId('day').textContent).toBe('Monday')
    expect(getByTestId('time').textContent).toBe('0am-3pm')
  })
})
