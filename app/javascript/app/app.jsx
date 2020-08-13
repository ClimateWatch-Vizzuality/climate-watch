import '@babel/polyfill';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import ScrollToTop from 'components/scroll-to-top';
import { withRouter } from 'react-router';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'cw-components/dist/main.css';
import 'styles/override/sticky.scss';
import 'styles/override/react-tooltip.scss';

import store from 'app/store';
import routes, { basename } from 'app/routes/routes';

const RoutesContainer = withRouter(({ location, history }) => {
  const { action } = history;
  const [currentLocation, setCurrentLocation] = useState(null);
  useEffect(() => {
    if (action !== 'REPLACE') {
      if (currentLocation) {
        const { pathname, search } = currentLocation;
        sessionStorage.setItem('previousLocationPathname', pathname);
        sessionStorage.setItem('previousLocationSearch', search);
      }
      setCurrentLocation(location);
    }
  }, [location.pathname]);

  return renderRoutes(routes);
});

RoutesContainer.propTypes = {
  location: PropTypes.object
};

const App = ({ data }) => (
  <Provider store={store(data)}>
    <BrowserRouter basename={basename}>
      <ScrollToTop>
        <RoutesContainer />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>
);

App.propTypes = {
  data: PropTypes.object
};

export default App;
