import axios from 'axios'
import firebase from 'firebase'

export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAIL = 'AUTH_FAIL'

const baseURL = process.env.REACT_APP_SERVER_URL

export const authenticate = () => dispatch => {
  try {
    firebase.auth().onAuthStateChanged(async user => {
      const idToken = await firebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ false)
      const res = await axios.post(`${baseURL}/users/current`, {
        authorization: idToken
      })
      dispatch({
        type: AUTH_SUCCESS,
        payload: { user: res.data, token: idToken }
      })
    })
  } catch (err) {
    dispatch({ type: AUTH_FAIL })
  }
}
