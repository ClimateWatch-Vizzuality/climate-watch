import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import createBrowserHistory from 'history/createBrowserHistory';

import store from 'app/store';
import routes from 'app/routes';

const history = createBrowserHistory();

const App = ({ data }) =>
  (<Provider store={store(data)}>
    <Router history={history}>
      {renderRoutes(routes)}
    </Router>
  </Provider>);

App.propTypes = {
  data: PropTypes.object
};

export default App;
