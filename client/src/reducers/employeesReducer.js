import {
  FETCH_EMPLOYEES_FROM_DB_SUCCESS,
  FETCH_EMPLOYEES_FROM_DB_FAIL,
  FETCH_EMPLOYEE_FROM_DB_SUCCESS,
  FETCH_EMPLOYEE_FROM_DB_FAIL,
  UPDATE_TIME_OFF_REQUEST_SUCCESS,
  UPDATE_TIME_OFF_REQUEST_FAIL,
  CREATE_EVENT,
  UPDATE_EVENT
} from '../actions'

const initialState = {
  employees: [],
  employee: [],
  error: ''
}

export const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES_FROM_DB_SUCCESS:
      return { employees: [...action.payload], error: '' }
    case FETCH_EMPLOYEES_FROM_DB_FAIL:
      return { ...initialState, error: 'fetching failed' }

    //verifies that the id of the time off request matches the time off id
    // and if it does it changes the status of the request on the DOM.
    case UPDATE_TIME_OFF_REQUEST_SUCCESS:
      const { payload: timeOff } = action
      return {
        ...state,
        employees: state.employees.map(employee => {
          if (employee.id === timeOff.user_id) {
            return {
              ...employee,
              time_off_requests: employee.time_off_requests.map(request => {
                if (request.id === timeOff.id) {
                  return timeOff
                } else {
                  return request
                }
              })
            }
          } else {
            return employee
          }
        })
      }
    case CREATE_EVENT: {
      const { payload: event } = action
      return {
        ...state,
        employees: state.employees.map(employee => {
          if (employee.id === event.user_id) {
            return {
              ...employee,
              events: [...employee.events, event]
            }
          } else {
            return employee
          }
        })
      }
    }
    case UPDATE_EVENT: {
      const { payload: event } = action
      console.log(event)
      console.log(state)
      return {
        ...state,
        employees: state.employees.map(employee => {
          console.log(employee)
          if (employee.id === event.user_id) {
            return {
              ...employee,
              events: employee.events.map(candidate => {
                console.log(candidate.id, event.id)
                if (candidate.id === event.id) {
                  return event
                } else {
                  return candidate
                }
              })
            }
          } else {
            return employee
          }
        })
      }
    }

    default:
      return state
  }
}

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEE_FROM_DB_SUCCESS:
      return {
        employee: action.payload,
        error: ''
      }
    case FETCH_EMPLOYEE_FROM_DB_FAIL:
      return { ...initialState, error: 'fetching failed' }

    default:
      return state
  }
}
