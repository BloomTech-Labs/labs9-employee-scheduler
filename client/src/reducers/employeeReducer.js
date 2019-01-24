import {
  FETCH_EMPLOYEE_FROM_DB_SUCCESS,
  FETCH_EMPLOYEE_FROM_DB_FAIL,
  DELETE_TIME_OFF_REQUEST_SUCCESS,
  ADD_TIME_OFF_REQUEST_SUCCESS,
  ADD_TIME_OFF_REQUEST_FAIL
} from '../actions'

const initialState = {
  employee: null,
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
      return {
        ...state,
        employee: {
          ...state.employee,
          time_off: [...state.employee.time_off, action.payload]
        }
      }
    case ADD_TIME_OFF_REQUEST_FAIL:
      return { ...state, error: 'request failed' }
    case DELETE_TIME_OFF_REQUEST_SUCCESS: {
      return {}
    }
    default:
      return state
  }
}
