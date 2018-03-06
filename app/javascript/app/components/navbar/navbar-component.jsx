import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Nav from 'components/nav';
import ToolsNav from 'components/tools-nav';

import styles from './navbar-styles.scss';

class NavBar extends PureComponent {
  render() {
    const { routes } = this.props;
    return (
      <div className={cx(styles.row, styles.navbar)}>
        <Nav routes={routes} isRendered />
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
