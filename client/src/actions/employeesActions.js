import axios from 'axios'

export const FETCH_EMPLOYEES_FROM_DB_SUCCESS = 'FETCH_EMPLOYEES_FROM_DB_SUCCESS'
export const FETCH_EMPLOYEES_FROM_DB_FAIL = 'FETCH_EMPLOYEES_FROM_DB_FAIL'
export const FETCH_EMPLOYEE_FROM_DB_SUCCESS = 'FETCH_EMPLOYEE_FROM_DB_SUCCESS'
export const FETCH_EMPLOYEE_FROM_DB_FAIL = 'FETCH_EMPLOYEE_FROM_DB_FAIL'

const baseURL = process.env.REACT_APP_SERVER_URL

export const fetchEmployeesFromDB = orgId => dispatch => {
  if (orgId) {
    axios
      .get(`${baseURL}/users/${orgId}`, {
        headers: { authorization: 'testing' }
      })
      .then(res =>
        dispatch({
          type: FETCH_EMPLOYEES_FROM_DB_SUCCESS,
          payload: res.data
        })
      )
      .catch(error => dispatch({ type: FETCH_EMPLOYEES_FROM_DB_FAIL }))
  } else {
    axios
      .get(`${baseURL}/users/`, { headers: { authorization: 'testing' } })
      .then(res => {
        dispatch({
          type: FETCH_EMPLOYEES_FROM_DB_SUCCESS,
          payload: res.data
        })
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: FETCH_EMPLOYEES_FROM_DB_FAIL })
      })
  }
}

// fetches a single employee by user id
export const fetchSingleEmployeeFromDB = userid => dispatch => {
  axios
    .get(`${baseURL}/dashboard/:id`, {
      headers: { authorization: 'testing' }
    })
    .then(res =>
      dispatch({
        type: FETCH_EMPLOYEE_FROM_DB_SUCCESS,
        payload: res.data
      })
    )
    .catch(error =>
      dispatch({
        type: FETCH_EMPLOYEE_FROM_DB_FAIL
      })
    )
}
