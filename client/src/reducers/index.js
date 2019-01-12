import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { employeesReducer, employeeReducer } from './employeesReducer'

export default combineReducers({
  auth: authReducer,
  employees: employeesReducer,
  employee: employeeReducer
})
