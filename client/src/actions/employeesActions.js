import axios from 'axios'

export const FETCH_EMPLOYEES_FROM_DB_SUCCESS = 'FETCH_EMPLOYEES_FROM_DB_SUCCESS'
export const FETCH_EMPLOYEES_FROM_DB_FAIL = 'FETCH_EMPLOYEES_FROM_DB_FAIL'
export const FETCH_EMPLOYEE_FROM_DB_SUCCESS = 'FETCH_EMPLOYEE_FROM_DB_SUCCESS'
export const FETCH_EMPLOYEE_FROM_DB_FAIL = 'FETCH_EMPLOYEE_FROM_DB_FAIL'
export const UPDATE_TIME_OFF_REQUEST_SUCCESS = 'UPDATE_TIME_OFF_REQUEST_SUCCESS'
export const UPDATE_TIME_OFF_REQUEST_FAIL = 'UPDATE_TIME_OFF_REQUEST_FAIL'
export const DELETE_TIME_OFF_REQUEST_SUCCESS = 'DELETE_TIME_OFF_REQUEST_SUCCESS'
export const ADD_TIME_OFF_REQUEST_SUCCESS = 'ADD_TIME_OFF_REQUEST_SUCCESS'
export const ADD_TIME_OFF_REQUEST_FAIL = 'ADD_TIME_OFF_REQUEST_FAIL'

const baseURL = process.env.REACT_APP_SERVER_URL

// the id here is for testing purposes. eventually it will be known on the backend based on the user's auth
export const fetchEmployeesFromDB = (orgId, token) => dispatch => {
  if (orgId) {
    axios
      .get(`${baseURL}/employees/${orgId}`, {
        headers: { authorization: token }
      })
      .then(res => {
        dispatch({
          type: FETCH_EMPLOYEES_FROM_DB_SUCCESS,
          payload: res.data
        })
      })
      .catch(error => dispatch({ type: FETCH_EMPLOYEES_FROM_DB_FAIL }))
  } else {
    // will probably roll both these routes into one once auth is up and running
    // for now just gonna leave this one here, leave it "decommissioned"
    axios
      .get(`${baseURL}/users/`, { headers: { authorization: token } })
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
export const fetchSingleEmployeeFromDB = (userid, token) => dispatch => {
  axios
    .get(`${baseURL}/dashboard/${userid}`, {
      headers: { authorization: token }
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

//dispositions employee time off requests
export const dispoTimeOffRequests = (timeOffId, status, token) => dispatch => {
  axios
    .put(
      `${baseURL}/time-off-requests/${timeOffId}`,
      { status },
      {
        headers: { authorization: token }
      }
    )
    .then(res =>
      dispatch({
        type: UPDATE_TIME_OFF_REQUEST_SUCCESS,
        payload: res.data
      })
    )
    .catch(error =>
      dispatch({
        type: UPDATE_TIME_OFF_REQUEST_FAIL,
        payload: error
      })
    )
}

export const deleteTimeOffRequest = (
  torId,
  token,
  userId
) => async dispatch => {
  try {
    await axios
      .delete(`${baseURL}/time-off-requests/${torId}`, {
        headers: { authorization: token }
      })
      .then(res =>
        dispatch({
          type: DELETE_TIME_OFF_REQUEST_SUCCESS,
          payload: userId,
          torId
        })
      )
  } catch (err) {
    console.log(err)
  }
}

export const addTimeOffRequest = (userId, date, reason, token) => dispatch => {
  axios
    .post(
      `${baseURL}/time-off-requests/${userId}`,
      { date: date, reason: reason },
      {
        headers: { authorization: token }
      }
    )
    .then(res =>
      dispatch({
        type: ADD_TIME_OFF_REQUEST_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => console.log(err))
}
