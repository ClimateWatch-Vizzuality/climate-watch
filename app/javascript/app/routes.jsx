import React from 'react'
import { Route } from 'react-router-dom'

import Layout from './layout'
import Home from 'components/home'
import Other from 'components/other'

export default () =>
  <Layout>
    <Route path="/" exact component={Home} />
    <Route path="/other" component={Other} />
  </Layout>
