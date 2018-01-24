import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import CountriesProvider from 'providers/countries-provider';
import NavBar from 'components/navbar';
import Footer from 'components/footer';
import { HOME_PAGE } from 'data/SEO';
import { MetaDescription, SocialMetadata } from 'components/seo';

import styles from './app-styles.scss'; // eslint-disable-line

class App extends PureComponent {
  render() {
    const { route, navRoutes, location } = this.props;
    return (
      <div>
        <MetaDescription descriptionContext={HOME_PAGE} />
        <SocialMetadata descriptionContext={HOME_PAGE} href={location.href} />
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
