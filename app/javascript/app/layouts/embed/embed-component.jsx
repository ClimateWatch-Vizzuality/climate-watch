import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import styles from './embed-styles.scss'; // eslint-disable-line

class Embed extends PureComponent {
  render() {
    const { route } = this.props;
    return <div>{renderRoutes(route.routes)}</div>;
  }
}

Embed.propTypes = {
  route: Proptypes.object
};

export default Embed;
