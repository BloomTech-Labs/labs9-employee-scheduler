import React, { Component } from 'react'
import axios from 'axios'
import { Global, css } from '@emotion/core'
import { NavLink, Route } from 'react-router-dom'

import './reset.css'

const serverUrl = process.env.REACT_APP_SERVER_URL

class App extends Component {
  componentDidMount() {
    axios
      .get(serverUrl)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <Global
          styles={css`
            html {
              font-size: 62.5%;
            }

            * {
              box-sizing: border-box;
            }
          `}
        />
        <h1>hello</h1>
        //Should be moved to it's own component because this is what should be
        in //it's own component because it should only be accessible on the
        calender view
        <Switch>
          //maybe this is supposed to be the employees
          <NavLink to="/admin/shift-scheduler">Calendar</NavLink>
          <NavLink to="/admin/employees">Employees</NavLink>
          //not sure what is supposed go on this route, but it's in the wire
          frame
          <NavLink to="/">Create Schedule</NavLink>
          <NavLink to="/admin/billing">Billing</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </Switch>
      </div>
    )
  }
}

export default App
