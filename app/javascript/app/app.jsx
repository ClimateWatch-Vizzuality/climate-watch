import 'babel-polyfill';
import 'cw-components/dist/main';

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import ScrollToTop from 'components/scroll-to-top';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'styles/sticky.scss';

import store from 'app/store';
import routes, { basename } from 'app/routes/routes';

const App = ({ data }) => (
  <Provider store={store(data)}>
    <BrowserRouter basename={basename}>
      <ScrollToTop>{renderRoutes(routes)}</ScrollToTop>
    </BrowserRouter>
  </Provider>
);

App.propTypes = {
  data: PropTypes.object
};

export default App;
