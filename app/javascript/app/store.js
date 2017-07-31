import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import createBrowserHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'

import reducers from './reducers'

const history = createBrowserHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middlewares = [thunk, routerMiddleware(history)]

const store = (initialState = {}) =>
  createStore(reducers, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
  ))

export { store, history }
