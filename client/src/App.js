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
import Login from './components/Login'

import './reset.css'

const serverUrl = process.env.REACT_APP_SERVER_URL

class App extends Component {
  constructor() {
    super()
    this.state = {
      api: null
    }
  }

  componentDidMount() {
    axios
      .get('https://cadence-api.herokuapp.com')
      .then(res => this.setState({ api: res.data.message }))
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

        <h1>
          {this.state.api ? `This is from the API: ${this.state.api}` : null}
        </h1>

        {/* This Switch should be moved to it's own component because it should
        only be accessible on the calender view */}
        <Switch>
          <Route path="/employees" render={props => <Employees {...props} />} />
          <Route
            path="/shift-calendar"
            render={props => <CreateSchedule {...props} />}
          />
          <Route path="/billing" render={props => <Billing {...props} />} />
          <Route path="/calendar" render={props => <Calendar {...props} />} />
          <Route path="/dashboard" render={props => <Dashboard {...props} />} />
          <Route path="/settings" render={props => <Settings {...props} />} />
          <Route path="/login" render={props => <Login {...props} />} />
        </Switch>
      </div>
    )
  }
}

export default App
