import axios from 'axios'
import firebase from 'firebase'

export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAIL = 'AUTH_FAIL'

const baseURL = process.env.REACT_APP_SERVER_URL

export const authenticate = () => dispatch => {
  console.log('running')
  return firebase
    .auth()
    .currentUser.getIdToken(/* forceRefresh */ false)
    .then(idToken => {
      console.log('token', idToken)
      return axios
        .post(`${baseURL}/users/current`, {
          authorization: idToken
        })
        .then(res => {
          console.log('res', res)
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
