import React from 'react'
import { Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { render, waitForElement } from 'react-testing-library'
import { renderWithRedux } from '../../testing/utils'
import Scheduler from '../components/Scheduler'
import { fetchSingleEmployeefromDB } from '../actions'
// import employees from './employees.json'
import {
  populateOrg,
  structureEmployees
} from '../../../database/utils/generateData'
import * as axios from 'axios'

jest.mock('axios')

// generate org with table structure
const org = populateOrg({ size: 4 })

// convert into nested employee data structure
const employees = structureEmployees(org)
const { users, events } = org

// find an employee who is scheduled
const scheduledEmployee = employees.find(
  employee => employee.id === events[0].user_id
)
const scheduledName = `${scheduledEmployee.first_name} ${
  scheduledEmployee.last_name
}`

describe('Scheduler', () => {
  it('renders with employee data', async () => {
    // mocks axios call so that we can control what data gets returned.
    // this is setting up the mock, so that when axios actually gets called
    // by the component, the test works appropriately.
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: employees }))

    // renders the component with both Redux and Router, with the route set
    // to the matching route for this component in App
    const { getByTestId, getByText, history, container } = renderWithRedux(
      <Scheduler />
    )

    // since axios and redux thunk are asyncronous, this waits for the page to
    // register changes from ComponentDidMount before proceeding with tests
    const testElement = await waitForElement(() => getByText(scheduledName))

    // uses test ids to assert expectations
    expect(testElement.textContent).toBeDefined()

    const cal = await waitForElement(() =>
      container.querySelector('.rbc-calendar')
    )

    expect(cal.textContent).toMatch(scheduledName)
  })
})
