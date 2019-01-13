import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-testing-library'
import { renderWithRedux } from './Redux'

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

const fetchSingleEmployeeFromDB = userid => dispatch => {
  dispatch({
    type: FETCH_EMPLOYEE_FROM_DB_SUCCESS,
    payload: employee
  })
}
function employeeReducer(state = { employee: [] }, action) {
  switch (action.type) {
    case 'FETCH_EMPLOYEE_FROM_DB_SUCCESS':
      return {
        employee: employee
      }
    default:
      return state
  }
}

class EmployeeDashboard extends React.Component {
  componentDidMount() {
    fetchSingleEmployeeFromDB()
  }

  render() {
    return (
      <div>
        <p data-testid="day">{employee.shifts[0].day}</p>
        <p data-testid="time">{employee.shifts[0].time}</p>
      </div>
    )
  }
}

describe('employee dashboard with redux', () => {
  it('can render with initial state', () => {
    const { getByTestId, getByText } = renderWithRedux(<EmployeeDashboard />)
    expect(getByTestId('day').textContent).toBe('Monday')
    expect(getByTestId('time').textContent).toBe('0am-3pm')
  })
})
