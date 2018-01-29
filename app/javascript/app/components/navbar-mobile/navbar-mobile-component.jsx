import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Icon from 'components/icon';
import Hamburger from 'components/hamburger';
import NavBar from 'components/navbar';

import cwLogo from 'assets/icons/cw-logo.svg';
import styles from './navbar-mobile-styles.scss';

const NavBarMobile = ({ routes, hamburgerIsOpen }) => (
  <div>
    <div className={styles.navbar}>
      <NavLink exact to="/">
        <Icon className={styles.logo} icon={cwLogo} />
      </NavLink>
      <Hamburger text={'MENU'} />
    </div>
    {hamburgerIsOpen && <NavBar routes={routes} />}
  </div>
);

NavBarMobile.propTypes = {
  hamburgerIsOpen: PropTypes.bool,
  routes: PropTypes.array
};

export default NavBarMobile;
