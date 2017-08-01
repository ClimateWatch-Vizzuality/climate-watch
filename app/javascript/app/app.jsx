import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router-dom'
import { store, history } from 'app/store'

import Layout from './layout'
import routes from './routes'

export default ({ data }) => (
  <Provider store={store(data)}>
    <ConnectedRouter history={history}>
      <Layout>
        {routes.map(route =>
          <Route key={route.path} {...route} />
        )}
      </Layout>
    </ConnectedRouter>
  </Provider>
)
