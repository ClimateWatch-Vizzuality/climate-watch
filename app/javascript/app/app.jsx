import React from 'react'
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import store from 'app/store'
import Layout from './layout'
import routes from './routes'

const history = createBrowserHistory()

export default ({ data }) => (
  <Provider store={store(data)}>
    <Router history={history}>
      <Layout>
        {routes.map(route =>
          <Route key={route.path} {...route} />
        )}
      </Layout>
    </Router>
  </Provider>
)
