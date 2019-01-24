import {
  FETCH_EMPLOYEE_FROM_DB_SUCCESS,
  FETCH_EMPLOYEE_FROM_DB_FAIL,
  DELETE_TIME_OFF_REQUEST_SUCCESS
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
    case DELETE_TIME_OFF_REQUEST_SUCCESS: {
      console.log(action.payload)
      const {
        payload: { user_id, time_off_id }
      } = action
      return {
        ...state,
        employee: state.employee.map(employee => {
          if (employee.id === user_id) {
            return {
              ...employee,
              time_off: employee.time_off.filter(event => {
                return event.id !== time_off_id
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
