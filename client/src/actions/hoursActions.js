import PropTypes from 'prop-types'
const axios = require('axios')

export const HOURS_FETCHED = 'HOURS_FETCHED'
export const HOURS_UPDATE_FAILED = 'HOURS_UPDATE_FAILED'
export const OPEN_HOURS_UPDATED = 'OPEN_HOURS_UPDATED'
export const HOURS_UPDATED = 'HOURS_UPDATED'
export const HOURS_FETCHING_FAILED = 'HOURS_FETCHING_FAILED'
export const HOURS_LOADING = 'HOURS_LOADING'
const baseUrl = process.env.REACT_APP_SERVER_URL

// edits the open time for a specific day
export const editHours = (hourId, changes, token) => async dispatch => {
  try {
    await axios.put(`${baseUrl}/hours-of-operation/${hourId}`, changes, {
      headers: { authorization: token }
    })
    await dispatch({
      type: HOURS_UPDATED,
      payload: { hourId, changes }
    })
  } catch (err) {
    dispatch({ type: HOURS_UPDATE_FAILED })
  }
}

editHours.propTypes = {
  type: PropTypes.string.isRequired,
  hourId: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  changes: PropTypes.objectOf(PropTypes.string).isRequired,
  headers: PropTypes.objectOf(PropTypes.string).isRequired,
  payload: PropTypes.objectOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired
}

// gets hours data from db
export const fetchHoursFromDB = (orgID, token) => async dispatch => {
  try {
    await dispatch(Loading())
    const req = await axios.get(`${baseUrl}/hours-of-operation/${orgID}`, {
      headers: { authorization: token }
    })
    dispatch({ type: HOURS_FETCHED, payload: req.data })
  } catch (err) {
    dispatch({ type: HOURS_FETCHING_FAILED })
  }
}

fetchHoursFromDB.propTypes = {
  type: PropTypes.string.isRequired,
  orgID: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  headers: PropTypes.objectOf(PropTypes.string).isRequired,
  payload: PropTypes.objectOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired
}

// sets a day to closed all day or not
export const closeAndOpenHours = (hourId, changes, token) => async dispatch => {
  try {
    const req = await axios.put(
      `${baseUrl}/hours-of-operation/${hourId}`,
      { closed: changes },
      { headers: { authorization: token } }
    )
    dispatch({ type: HOURS_UPDATED, payload: { hourId, changes, req } })
  } catch (err) {
    dispatch({ type: HOURS_UPDATE_FAILED })
  }
}

closeAndOpenHours.propTypes = {
  type: PropTypes.string.isRequired,
  hourId: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  changes: PropTypes.object.isRequired,
  headers: PropTypes.objectOf(PropTypes.string).isRequired,
  payload: PropTypes.objectOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired
}

const Loading = () => ({
  type: HOURS_LOADING
})
