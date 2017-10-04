import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';

import Icon from 'components/icon';

import cwLogo from 'assets/icons/cw-logo.svg';
import styles from './nav-styles.scss';

class Nav extends PureComponent {
  render() {
    const { location, routes, className, hideLogo } = this.props;
    return (
      <nav className={cx(styles.navbar, className)}>
        {!hideLogo && location.pathname !== '/' && (
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
      </nav>
    );
  }
}

Nav.propTypes = {
  hideLogo: PropTypes.bool.isRequired,
  routes: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  className: PropTypes.string
};

Nav.defaultProps = {
  routes: [],
  hideLogo: false
};

export default Nav;
