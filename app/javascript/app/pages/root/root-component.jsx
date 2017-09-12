import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import Nav from 'components/nav';

import styles from "./root-styles.scss"; // eslint-disable-line

class Root extends PureComponent {
  render() {
    const { route } = this.props;
    return (
      <div>
        <Nav />
        {renderRoutes(route.routes)}
      </div>
    );
  }
}

Root.propTypes = {
  route: Proptypes.object
};

export default Root;
