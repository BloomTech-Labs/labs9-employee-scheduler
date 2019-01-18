import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import {
  employeesReducer,
  employeeReducer,
  hoursReducer
} from './employeesReducer'
import { registerReducer } from './registerReducer'

export default combineReducers({
  auth: authReducer,
  employees: employeesReducer,
  employee: employeeReducer,
  registration: registerReducer,
  hours: hoursReducer
})
