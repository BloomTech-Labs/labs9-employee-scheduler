const axios = require('axios')

export const CREATE_EVENT = 'CREATE_EVENT'
export const UPDATE_EVENT = 'UPDATE_EVENT'
export const EVENT_ERROR = 'EVENT_ERROR'
export const HOURS_FETCHED = 'HOURS_FETCHED'
export const HOURS_UPDATE_FAILED = 'HOURS_UPDATE_FAILED'
export const CLOSE_HOURS_UPDATED = 'CLOSE_HOURS_UPDATED'
export const OPEN_HOURS_UPDATED = 'OPEN_HOURS_UPDATED'
export const HOURS_UPDATED = 'HOURS_UPDATED'
export const HOURS_FETCHING_FAILED = 'HOURS_FETCHING_FAILED'
const baseUrl = process.env.REACT_APP_SERVER_URL

export const createEvent = ({ employee, start }) => async dispatch => {
  try {
    const processed = {
      user_id: employee.id,
      start,
      end: new Date(start.getTime() + 1000 * 60 * 60)
    }
    const req = await axios.post(`${baseUrl}/events`, processed, {
      headers: { authorization: 'testing ' }
    })
    dispatch({ type: CREATE_EVENT, payload: req.data })
  } catch (err) {
    dispatch({ type: EVENT_ERROR })
  }
}

export const changeEvent = ({ event, changes }) => async dispatch => {
  const { id } = event
  try {
    const req = await axios.put(`${baseUrl}/events/${id}`, changes, {
      headers: { authorization: 'testing' }
    })
    dispatch({ type: UPDATE_EVENT, payload: req.data })
  } catch (err) {
    dispatch({ type: EVENT_ERROR })
  }
}

// edits the open time for a specific day
export const editOpenHours = (orgID, changes, token) => async dispatch => {
  try {
    const req = await axios.put(
      `${baseUrl}/hours-of-operation/${orgID}`,
      { open_time: changes, closed: 0 },
      { headers: { authorization: token } }
    )
    dispatch({ type: OPEN_HOURS_UPDATED, payload: req.data })
  } catch (err) {
    dispatch({ type: HOURS_UPDATE_FAILED })
  }
}

// edits the closed time for a specific day
export const editCloseHours = (orgID, changes, token) => async dispatch => {
  try {
    const req = await axios.put(
      `${baseUrl}/hours-of-operation/${orgID}`,
      { close_time: changes, closed: 0 },
      { headers: { authorization: token } }
    )
    dispatch({ type: CLOSE_HOURS_UPDATED, payload: req.data })
  } catch (err) {
    dispatch({ type: HOURS_UPDATE_FAILED })
  }
}

// gets hours data from db
export const fetchHoursFromDB = (orgID, token) => async dispatch => {
  try {
    const req = await axios.get(`${baseUrl}/hours-of-operation/${orgID}`, {
      headers: { authorization: token }
    })
    dispatch({ type: HOURS_FETCHED, payload: req.data })
  } catch (err) {
    dispatch({ type: HOURS_FETCHING_FAILED })
  }
}

// sets a day to closed all day or not
export const closeAndOpenHours = (orgId, changes, token) => async dispatch => {
  try {
    const req = await axios.put(
      `${baseUrl}/hours-of-operation/${orgId}`,
      { close: changes },
      { headers: { authorization: token } }
    )
    dispatch({ type: HOURS_UPDATED, payload: req.data })
  } catch (err) {
    dispatch({ type: HOURS_UPDATE_FAILED })
  }
}
