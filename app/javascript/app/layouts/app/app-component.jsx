import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import CountriesProvider from 'providers/countries-provider';
import NavBar from 'components/navbar';
import Footer from 'components/footer';
import { HOME_PAGE, getMetaDescription, getSocialMetadata } from 'data/SEO';

import styles from './app-styles.scss'; // eslint-disable-line

class App extends PureComponent {
  render() {
    const { route, navRoutes, location } = this.props;
    return (
      <div>
        {/* SEO data import */}
        {getMetaDescription(HOME_PAGE)}
        {getSocialMetadata(HOME_PAGE, location.href)}
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
  navRoutes: Proptypes.array,
  location: Proptypes.object.isRequired
};

export default App;
