import React, { Component } from 'react'
import axios from 'axios'
import { Global, css } from '@emotion/core'
import { Route, Switch } from 'react-router-dom'
import Calendar from './components/Calendar'
import Employees from './components/Employees'
import CreateSchedule from './components/CreateSchedule'
import Billing from './components/Billing'
import Home from './components/Home'
import Dashboard from './components/EmployeeDashboard'
import Settings from './components/Settings'
import Login from './components/Login'
import Register from './components/Register'
import { Elements, StripeProvider } from 'react-stripe-elements'

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
      .get(serverUrl, {
        headers: { authorization: 'testing' }
      })
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
              font-family: 'Nunito', sans-serif;
            }

            * {
              box-sizing: border-box;
            }

            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            label {
              font-family: 'Lato', serif;
            }

            a,
            input,
            button {
              text-decoration: none;
              font-family: 'Nunito', sans-serif;
              outline: none;
            }
          `}
        />
        <Route exact path="/" render={props => <Home {...props} />} />

        <StripeProvider apiKey="pk_test_HKBgYIhIo21X8kQikefX3Ei1">
          <Elements>
            <Switch>
              <Route path="/employees" component={Employees} />
              <Route path="/shift-calendar" component={CreateSchedule} />
              <Route path="/register" component={Register} />
              <Route path="/billing" component={Billing} />
              <Route path="/calendar" component={Calendar} />
              <Route path="/dashboard/:id" component={Dashboard} />
              <Route path="/settings" component={Settings} />
              <Route path="/login" render={props => <Login {...props} />} />
            </Switch>
          </Elements>
        </StripeProvider>
      </div>
    )
  }
}

export default App
