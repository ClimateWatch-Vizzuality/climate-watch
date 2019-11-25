import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import CountriesProvider from 'providers/countries-provider';
import { HOME_PAGE } from 'data/SEO';
import { MetaDescription, SocialMetadata } from 'components/seo';
import Footer from 'components/footer';

class App extends PureComponent {
  render() {
    const { route, location } = this.props;
    return (
      <div>
        <MetaDescription descriptionContext={HOME_PAGE} />
        <SocialMetadata descriptionContext={HOME_PAGE} href={location.href} />
        <CountriesProvider />
        {renderRoutes(route.routes.filter(r => r.path))}
        <Footer includeBottom={false} includeContact={false} isContained />
      </div>
    );
  }
}

App.propTypes = {
  route: Proptypes.object,
  location: Proptypes.object.isRequired
};

export default App;
