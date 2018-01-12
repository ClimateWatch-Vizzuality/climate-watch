import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { Helmet } from 'react-helmet';

import CountriesProvider from 'providers/countries-provider';
import NavBar from 'components/navbar';
import Footer from 'components/footer';
import { HOME_PAGE } from 'data/SEO';

import styles from './app-styles.scss'; // eslint-disable-line

const TITLE = 'Climate Watch: Data for Climate Action';

class App extends PureComponent {
  render() {
    const { route, navRoutes, location } = this.props;
    return (
      <div>
        <Helmet>
          <title>Climate Watch: Data for Climate Action</title>
          <meta itemProp="name" content={TITLE} />
          <meta name="description" content={HOME_PAGE} />

          {/* Twitter Card data */}
          <meta name="twitter:title" content={TITLE} />
          <meta name="twitter:creator" content="@vizzuality" />
          <meta name="twitter:description" content={HOME_PAGE} />

          {/* Open Graph data */}
          <meta property="og:title" content={TITLE} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={location.href} />
          <meta property="og:description" content={HOME_PAGE} />
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
