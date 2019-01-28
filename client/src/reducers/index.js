import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { employeesReducer } from './employeesReducer'
import { employeeReducer } from './employeeReducer'
import { registerReducer } from './registerReducer'
import { paymentReducer } from './paymentReducer'
import { hoursReducer } from './hoursReducer'
import { coverageReducer } from './coverageReducer'

export default combineReducers({
  auth: authReducer,
  employees: employeesReducer,
  employee: employeeReducer,
  registration: registerReducer,
  hours: hoursReducer,
  organization: paymentReducer,
  coverage: coverageReducer
})
