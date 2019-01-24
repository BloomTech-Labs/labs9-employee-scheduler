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
      const { torId } = action.payload
      return {
        employee: state.employee.map(request => {
          if (request.id !== torId) {
            return {
              request
            }
          } else {
            return { ...request }
          }
        })
      }
    }
    default:
      return state
  }
}
