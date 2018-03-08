import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import ToolsNav from 'components/tools-nav';

import styles from './navbar-styles.scss';

class NavBar extends PureComponent {
  render() {
    const { routes } = this.props;
    return (
      <div className={styles.row}>
        <div className={styles.navigationWrapper}>
          <Nav routes={routes} className={styles.navigation} isRendered />
        </div>
        <ToolsNav />
      </div>
    );
  }
}

NavBar.propTypes = {
  routes: PropTypes.array.isRequired
};

NavBar.defaultProps = {
  routes: []
};

export default NavBar;
