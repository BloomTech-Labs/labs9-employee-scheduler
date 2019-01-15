import axios from 'axios'
import firebase from 'firebase/app'
// this import style is required for proper codesplitting of firebase
import 'firebase/auth'

export const REGISTER_AS_OWNER_SUCCESS = 'REGISTER_AS_OWNER_SUCCESS'
export const REGISTER_AS_OWNER_FAIL = 'REGISTER_AS_OWNER_FAIL'

const baseURL = process.env.REACT_APP_SERVER_URL

export const registerAsOwner = packet => async dispatch => {
  const idToken = await firebase.auth().currentUser.getIdToken(false)

  axios
    .post(`${baseURL}/users/register/owner/`, packet, {
      headers: { authorization: idToken }
    })
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
