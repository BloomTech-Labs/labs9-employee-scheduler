import axios from 'axios'
import firebase from 'firebase/app'
// this import style is required for proper codesplitting of firebase
import 'firebase/auth'

export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAIL = 'AUTH_FAIL'

const baseURL = process.env.REACT_APP_SERVER_URL

//puts token on headers for the backend
export const authenticate = () => dispatch => {
  const { currentUser } = firebase.auth()
  if (currentUser) {
    return currentUser
      .getIdToken(/* forceRefresh */ false)
      .then(idToken => {
        return axios
          .post(`${baseURL}/users/current`, null, {
            headers: { authorization: idToken }
          })
          .then(res => {
            dispatch({
              type: AUTH_SUCCESS,
              payload: { user: res.data, token: idToken }
            })
          })
      })
      .catch(err => {
        console.dir(err)
        dispatch({ type: AUTH_FAIL })
      })
  }
  return dispatch({ type: AUTH_FAIL })
}
