import React from 'react';
import { NavLink } from 'react-router-dom';

import Icon from 'components/icon';

import cwLogo from 'assets/icons/cw-logo.svg';
import styles from './navbar-mobile-styles.scss';

const NavBarMobile = () => (
  <div className={styles.navbar}>
    <NavLink exact to="/">
      <Icon className={styles.logo} icon={cwLogo} />
    </NavLink>
  </div>
);

export default NavBarMobile;
