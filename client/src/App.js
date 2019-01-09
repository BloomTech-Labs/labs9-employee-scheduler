import React, { Component } from 'react'
import axios from 'axios'
import { Global, css } from '@emotion/core'
import { NavLink, Route, Switch } from 'react-router-dom'
import Calendar from './components/Calendar'
import Employees from './components/Employees'
import CreateSchedule from './components/CreateSchedule'
import Billing from './components/Billing'
import Home from './components/Home'
import Dashboard from './components/EmployeeDashboard'
import Settings from './components/Settings'
import Register from './components/Register'

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
              font-family: 'Open Sans', sans-serif;
            }

            * {
              box-sizing: border-box;
            }
          `}
        />
        <Route exact path="/" render={props => <Home {...props} />} />
        <h1>hello</h1>
        {/* This Switch should be moved to it's own component because it should
        only be accessible on the calender view */}
        <nav>
          <NavLink to="/calendar">Calendar</NavLink>
          <NavLink to="/employees">Employees</NavLink>
          <NavLink to="/shift-calendar">Create Schedule</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </nav>
        <Switch>
          <Route path="/employees" component={Employees} />
          <Route path="/shift-calendar" component={CreateSchedule} />
          <Route path="/register" component={Register} />
          <Route path="/billing" component={Billing} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </div>
    )
  }
}

export default App
