import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import NavBar from 'components/navbar';
import Footer from 'components/footer';

import styles from './root-styles.scss'; // eslint-disable-line

class Root extends PureComponent {
  render() {
    const { route } = this.props;
    const navRoutes = route.routes.filter(r => r.nav);
    return (
      <div>
        <NavBar routes={navRoutes} />
        {renderRoutes(route.routes)}
        <Footer routes={navRoutes} />
      </div>
    );
  }
}

Root.propTypes = {
  route: Proptypes.object
};

export default Root;
