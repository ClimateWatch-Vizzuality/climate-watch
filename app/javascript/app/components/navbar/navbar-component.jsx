import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Nav from 'components/nav';
import ToolsNav from 'components/tools-nav';

import layout from 'styles/layout.scss';
import styles from './navbar-styles.scss';

class NavBar extends PureComponent {
  render() {
    const { routes } = this.props;
    return (
      <div className={cx(layout.content, styles.navbar)}>
        <Nav routes={routes} isRendered location />
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
