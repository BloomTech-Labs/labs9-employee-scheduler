import React, { Component } from 'react'
import axios from 'axios'
import { Global, css } from '@emotion/core'

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
      </div>
    )
  }
}

export default App
