import {
  FETCH_EMPLOYEE_FROM_DB_SUCCESS,
  FETCH_EMPLOYEE_FROM_DB_FAIL,
  DELETE_TIME_OFF_REQUEST_SUCCESS,
  ADD_TIME_OFF_REQUEST_SUCCESS,
  ADD_TIME_OFF_REQUEST_FAIL
} from '../actions'

const initialState = {
  employee: [],
  error: ''
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
    case ADD_TIME_OFF_REQUEST_SUCCESS:
      return { ...state, ...action.payload }
    case ADD_TIME_OFF_REQUEST_FAIL:
      return { ...initialState, error: 'request failed' }
    case DELETE_TIME_OFF_REQUEST_SUCCESS: {
      const {
        payload: { user_id, event_id }
      } = action
      return {
        ...state,
        employees: state.employees.map(employee => {
          if (employee.id === user_id) {
            return {
              ...employee,
              events: employee.events.filter(candidate => {
                return candidate.id !== event_id
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
