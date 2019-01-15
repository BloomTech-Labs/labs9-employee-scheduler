import axios from 'axios'

export const REGISTER_AS_OWNER_SUCCESS = 'REGISTER_AS_OWNER_SUCCESS'
export const REGISTER_AS_OWNER_FAIL = 'REGISTER_AS_OWNER_FAIL'

const baseURL = process.env.REACT_APP_SERVER_URL

export const registerAsOwner = packet => dispatch => {
  axios
    .post(
      `${baseURL}/register/owner/`,
      {
        headers: { authorization: 'testing' }
      },
      packet
    )
    .then(res => {
      dispatch({
        type: REGISTER_AS_OWNER_SUCCESS,
        payload: res.data
      })
    })
    .catch(error => {
      dispatch({ type: REGISTER_AS_OWNER_FAIL })
    })
}
