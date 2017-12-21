import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import CountriesProvider from 'providers/countries-provider';
import NavBar from 'components/navbar';
import Footer from 'components/footer';

import styles from './app-styles.scss'; // eslint-disable-line

class App extends PureComponent {
  render() {
    const { route, navRoutes } = this.props;
    return (
      <div>
        <CountriesProvider />
        <NavBar routes={navRoutes} />
        {renderRoutes(route.routes.filter(r => r.path))}
        <Footer routes={navRoutes} />
      </div>
    );
  }
}

App.propTypes = {
  route: Proptypes.object,
  navRoutes: Proptypes.array
};

export default App;
