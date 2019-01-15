import {
  FETCH_EMPLOYEES_FROM_DB_SUCCESS,
  FETCH_EMPLOYEES_FROM_DB_FAIL,
  FETCH_EMPLOYEE_FROM_DB_SUCCESS,
  FETCH_EMPLOYEE_FROM_DB_FAIL,
  UPDATE_TIME_OFF_REQUEST_SUCCESS,
  UPDATE_TIME_OFF_REQUEST_FAILL
} from '../actions/employeesActions'

const initialState = {
  employees: [],
  employee: [],
  error: '',
  approved: false,
  denied: false
}

export const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES_FROM_DB_SUCCESS:
      return { employees: [...action.payload], error: '' }
    case FETCH_EMPLOYEES_FROM_DB_FAIL:
      return { ...initialState, error: 'fetching failed' }
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

//dispositions employee time off requests
// export const dispoTimeOffRequestsReducer = (state = initialState, action => {
//   switch(action.type) {
//     case UPDATE_TIME_OFF_REQUEST_SUCCESS:
//     return {
//       if(action.payload === denied {})
//     }
//   }
// })
