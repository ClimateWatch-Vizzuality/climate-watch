import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import CountriesProvider from 'providers/countries-provider';

import layout from 'styles/layout';

class Embed extends PureComponent {
  render() {
    const { route } = this.props;
    return (
      <div className={layout.content}>
        <CountriesProvider />
        {renderRoutes(route.routes)}
      </div>
    );
  }
}

Embed.propTypes = {
  route: Proptypes.object
};

export default Embed;
