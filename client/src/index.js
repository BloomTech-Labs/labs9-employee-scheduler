import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import WebFont from 'webfontloader'
import thunk from 'redux-thunk'
import * as serviceWorker from './serviceWorker'

import Store from './reducers/index.js'
import App from './App'
import ScrollToTop from './components/ScrollToTop'

WebFont.load({
  google: {
    families: ['Lato:700', 'Nunito']
  }
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(Store, composeEnhancers(applyMiddleware(thunk)))

render(
  <Provider store={store}>
    <Router>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
