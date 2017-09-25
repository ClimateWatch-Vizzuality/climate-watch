import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Icon from 'components/icon';
import ToolsNav from 'components/tools-nav';

import cwLogo from 'assets/icons/cw-logo.svg';
import layout from 'styles/layout.scss';
import styles from './nav-styles.scss';

class NavBar extends PureComponent {
  render() {
    const { location, routes } = this.props;
    return (
      <div className={layout.content}>
        <nav className={styles.navbar}>
          {location.pathname !== '/' && (
            <NavLink exact className={styles.link} to="/">
              <Icon className={styles.logo} icon={cwLogo} />
            </NavLink>
          )}
          {routes.map(route => (
            <NavLink
              key={route.path}
              className={styles.link}
              activeClassName={styles.linkActive}
              to={route.path}
            >
              {route.label}
            </NavLink>
          ))}
          <ToolsNav />
        </nav>
      </div>
    );
  }
}

NavBar.propTypes = {
  routes: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired
};

NavBar.defaultProps = {
  routes: []
};

export default NavBar;
