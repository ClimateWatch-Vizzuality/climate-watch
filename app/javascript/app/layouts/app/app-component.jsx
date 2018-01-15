import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { Helmet } from 'react-helmet';

import CountriesProvider from 'providers/countries-provider';
import NavBar from 'components/navbar';
import Footer from 'components/footer';
import { TITLE, HOME_PAGE, getMetaDescription } from 'data/SEO';

import styles from './app-styles.scss'; // eslint-disable-line

class App extends PureComponent {
  render() {
    const { route, navRoutes, location } = this.props;
    return (
      <div>
        <Helmet>
          <title>{TITLE}</title>
          {/* SEO data import */}
          {getMetaDescription(HOME_PAGE)}
          {/* Twitter Card data */}
          <meta name="twitter:creator" content="@vizzuality" />

          {/* Open Graph data */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={location.href} />
        </Helmet>
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
