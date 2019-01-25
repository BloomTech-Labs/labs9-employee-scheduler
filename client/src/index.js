import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { reduxSearch } from 'redux-search'
import thunk from 'redux-thunk'
import * as serviceWorker from './serviceWorker'

import Store from './reducers/index.js'
import App from './App'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  Store,
  composeEnhancers(
    applyMiddleware(thunk),
    reduxSearch({
      //configure redux-search by telling it which resources to inded for searching
      resourceIndex: {
        employees: ['first_name', 'last_name']
      },
      resourceSelector: (resourceName, state) => {
        return state.resources.get(resourceName)
      }
    })
  )
)

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
