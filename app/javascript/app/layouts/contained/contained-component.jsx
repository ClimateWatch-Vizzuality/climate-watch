import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import CountriesProvider from 'providers/countries-provider';
import Footer from 'components/footer';

class App extends PureComponent {
  render() {
    const { route } = this.props;
    return (
      <div>
        <CountriesProvider />
        {renderRoutes(route.routes.filter(r => r.path))}
        <Footer includeBottom={false} includeContact={false} isContained />
      </div>
    );
  }
}

App.propTypes = {
  route: Proptypes.object
};

export default App;
