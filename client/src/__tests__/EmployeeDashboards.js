import React from 'react'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { render, fireEvent, cleanup } from 'react-testing-library'
import { fetchSingleEmployeeFromDB } from '../actions/employeesActions'
import { employeeReducer } from '../reducers/employeesReducer'
import EmployeeDashboard from '../components/EmployeeDashboard'

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState or the entire store that the ui is rendered with

function renderWithRedux(
  ui,
  { initialState, store = createStore(employeeReducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  }
}

describe('Employee Dashboard', () => {
  it('calls fetchSingleEmployeeFromDB once', () => {
    const { getByTestId, getByText } = renderWithRedux(<EmployeeDashboard />)
    expect(fetchSingleEmployeeFromDB).toHaveBeenCalled(1)
  })
})
