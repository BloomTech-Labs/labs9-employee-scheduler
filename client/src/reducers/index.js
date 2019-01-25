import { combineReducers } from 'redux'
import { authReducer } from './authReducer'
import { employeesReducer } from './employeesReducer'
import { employeeReducer } from './employeeReducer'
import { registerReducer } from './registerReducer'
import { paymentReducer } from './paymentReducer'
import { hoursReducer } from './hoursReducer'
import { availabilityReducer } from './availabilityReducer'
import { coverageReducer } from './coverageReducer'
import { reducer as SearchReducer } from 'redux-search'

export default combineReducers({
  search: SearchReducer,
  auth: authReducer,
  employees: employeesReducer,
  employee: employeeReducer,
  registration: registerReducer,
  hours: hoursReducer,
  organization: paymentReducer,
  availability: availabilityReducer,
  coverage: coverageReducer
})
