import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import store from 'app/store';
import Container from 'app/pages/container';
import routes from 'app/routes';

const history = createBrowserHistory();

const App = ({ data }) =>
  (<Provider store={store(data)}>
    <Router history={history}>
      <Container>
        <Switch>
          {routes.map(route => <Route key={route.path} {...route} />)}
          <Redirect to="/error-page" />
        </Switch>
      </Container>
    </Router>
  </Provider>);

App.propTypes = {
  data: PropTypes.object
};

export default App;
