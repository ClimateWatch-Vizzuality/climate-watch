import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import TopBar from 'components/topbar';
import Nav from 'components/nav';

import styles from "./root-styles.scss"; // eslint-disable-line

class Root extends Component {
  shouldComponentUpdate() {
    // Improve this to better performance
    return true;
  }

  render() {
    const { route } = this.props;
    return (
      <div>
        <TopBar />
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
