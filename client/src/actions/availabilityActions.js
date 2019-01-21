import axios from 'axios'

export const UPDATE_AVAILABILITY = 'UPDATE_AVAILABILITY'
export const UPDATE_AVAILABILITY_FAIL = 'UPDATE_AVAILABILITY_FAIL'

const baseURL = process.env.REACT_APP_SERVER_URL

export const editAvailability = (employeeId, changes) => dispatch => {
  axios
    .put(
      `${baseURL}/availabilities/${employeeId}`,
      { changes },
      {
        headers: { authorization: 'testing' }
      }
    )
    .then(res => {
      dispatch({
        type: UPDATE_AVAILABILITY,
        payload: res.data
      })
    })
    .catch(error =>
      dispatch({
        type: UPDATE_AVAILABILITY_FAIL,
        payload: error
      })
    )
}
