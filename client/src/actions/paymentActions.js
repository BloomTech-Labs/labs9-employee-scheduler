import axios from 'axios'

export const FETCH_ORG_FROM_DB_SUCCESS = 'FETCH_ORG_FROM_DB_SUCCESS'
export const FETCH_ORG_FROM_DB_FAIL = 'FETCH_ORG_FROM_DB_FAIL'

const baseURL = process.env.REACT_APP_SERVER_URL

export const fetchOrgFromDB = (orgId, token) => dispatch => {
  axios
    .get(`${baseURL}/organizations/${orgId}`, {
      headers: { authorization: token }
    })
    .then(res => {
      dispatch({
        type: FETCH_ORG_FROM_DB_SUCCESS,
        payload: res.data
      })
    })
    .catch(error => dispatch({ type: FETCH_ORG_FROM_DB_FAIL }))
}
