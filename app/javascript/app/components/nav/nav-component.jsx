import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Icon from 'components/icon';
import ToolsNav from 'components/tools-nav';

import cwLogo from 'assets/icons/cw-logo.svg';
import layout from 'styles/layout.scss';
import styles from './nav-styles.scss';

class NavBar extends PureComponent {
  render() {
    const { location } = this.props;
    return (
      <div className={layout.content}>
        <nav className={styles.navbar}>
          {location.pathname !== '/' && (
            <NavLink exact className={styles.link} to="/">
              <Icon className={styles.logo} icon={cwLogo} />
            </NavLink>
          )}
          <div className={styles.linkWrapper}>
            <NavLink
              className={styles.link}
              activeClassName={styles.linkActive}
              to="/countries"
            >
              COUNTRIES
            </NavLink>
          </div>
          <NavLink
            className={styles.link}
            activeClassName={styles.linkActive}
            to="/sectors"
          >
            SECTORS
          </NavLink>
          <NavLink
            className={styles.link}
            activeClassName={styles.linkActive}
            to="/ndcs"
          >
            NDCs
          </NavLink>
          <NavLink
            className={styles.link}
            activeClassName={styles.linkActive}
            to="/hgh"
          >
            GHG EMISSIONS
          </NavLink>
          <NavLink
            className={styles.link}
            activeClassName={styles.linkActive}
            to="/stories"
          >
            STORIES
          </NavLink>
          <NavLink
            className={styles.link}
            activeClassName={styles.linkActive}
            to="/about"
          >
            ABOUT
          </NavLink>
          <ToolsNav />
        </nav>
      </div>
    );
  }
}

NavBar.propTypes = {
  location: Proptypes.object.isRequired
};

NavBar.defaultProps = {
  countriesOpen: false
};

export default NavBar;
