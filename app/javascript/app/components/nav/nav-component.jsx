import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from 'components/icon';

import cwLogo from 'assets/icons/cw-logo.svg';
import layout from 'styles/layout.scss';
import styles from './nav-styles.scss';

const NavBar = () =>
  (<div className={layout.content}>
    <div className={styles.navbar}>
      <NavLink exact className={styles.link} to="/">
        <Icon className={styles.logo} icon={cwLogo} />
      </NavLink>
      <NavLink
        className={styles.link}
        activeClassName={styles.linkActive}
        to="/countries"
      >
        COUNTRIES
      </NavLink>
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
    </div>
  </div>);

export default NavBar;
