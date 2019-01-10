import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { employeesReducer } from './employeesReducer'

export default combineReducers({
  auth: authReducer,
  employees: employeesReducer
})
