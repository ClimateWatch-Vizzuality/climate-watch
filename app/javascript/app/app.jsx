import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router-dom'
import { store, history } from 'app/store'

import routes from './routes'

export default ({ data }) => (
  <Provider store={store(data)}>
    <ConnectedRouter history={history}>
      <Route>{routes}</Route>
    </ConnectedRouter>
  </Provider>
)
