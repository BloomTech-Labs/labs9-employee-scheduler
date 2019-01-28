import axios from 'axios'

export const UPDATE_AVAILABILITY = 'UPDATE_AVAILABILITY'
export const UPDATE_AVAILABILITY_FAIL = 'UPDATE_AVAILABILITY_FAIL'

const baseURL = process.env.REACT_APP_SERVER_URL

export const editAvailability = ({
  changes,
  availability,
  token
}) => async dispatch => {
  console.log(changes)
  const { id: availabilityId } = availability

  try {
    const res = await axios.put(
      `${baseURL}/availabilities/${availabilityId}`,
      changes,
      {
        headers: { authorization: token }
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
