import axios from 'axios'

export const UPDATE_AVAILABILITY = 'UPDATE_AVAILABILITY'
export const UPDATE_AVAILABILITY_FAIL = 'UPDATE_AVAILABILITY_FAIL'
export const GET_AVAILABILITY = 'GET_AVAILABILITY'
export const GET_AVAILABILITY_FAIL = 'GET_AVAILABILITY_FAIL'
export const AVAILABILITY_LOADING = 'AVAILABILITY_LOADING'

const baseURL = process.env.REACT_APP_SERVER_URL

export const getAvailability = employeeId => dispatch => {
  axios
    .get(`${baseURL}/availabilities/${employeeId}`, {
      headers: { authorization: 'testing' }
    })
    .then(res => {
      dispatch({
        type: GET_AVAILABILITY,
        payload: res.data
      })
    })
    .catch(error =>
      dispatch({
        type: GET_AVAILABILITY_FAIL,
        payload: error
      })
    )
}

export const editAvailability = ({
  changes,
  availability
}) => async dispatch => {
  const { id: availabilityId, user_id: employeeId } = availability

  try {
    const res = await axios.put(
      `${baseURL}/availabilities/${availabilityId}`,
      changes,
      {
        headers: { authorization: 'testing' }
      }
    )

    dispatch({
      type: UPDATE_AVAILABILITY,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: UPDATE_AVAILABILITY_FAIL
    })
  }
}
