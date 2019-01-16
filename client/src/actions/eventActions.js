const axios = require('axios')

export const CREATE_EVENT = 'CREATE_EVENT'
export const EVENT_ERROR = 'EVENT_ERROR'

const baseUrl = process.env.REACT_APP_SERVER_URL

export const createEvent = ({ employee, start }) => async dispatch => {
  try {
    const processed = {
      user_id: employee.user_id,
      start,
      end: new Date(start.getTime() + 1000 * 60 * 60)
    }
    console.log(processed)
    // const req = await axios.post(`${baseUrl}/events`, event, {
    //   headers: { authorization: 'testing ' }
    // })
    // dispatch({ type: CREATE_EVENT, payload: req.body })
  } catch (err) {
    dispatch({ type: EVENT_ERROR })
  }
}
