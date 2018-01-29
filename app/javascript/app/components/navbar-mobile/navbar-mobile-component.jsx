import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Icon from 'components/icon';
import Hamburger from 'components/hamburger';
import Nav from 'components/nav';
import ToolsNav from 'components/tools-nav';

import contactIcon from 'assets/icons/contact.svg';
import cwLogo from 'assets/icons/cw-logo.svg';
import styles from './navbar-mobile-styles.scss';

const NavBarMobile = ({ routes, hamburgerIsOpen }) => (
  <div className={styles.navbarMobile}>
    <div className={styles.navbar}>
      <NavLink exact to="/">
        <Icon className={styles.logo} icon={cwLogo} />
      </NavLink>
      <Hamburger text={'MENU'} />
    </div>
    {hamburgerIsOpen && (
      <div className={styles.navMenu}>
        <Nav routes={routes} allowNested={false} />
        <div className={styles.contactContainer}>
          <a className={styles.contact} href="mailto:climatewatch@wri.org">
            CONTACT US
          </a>
          <Icon icon={contactIcon} />
        </div>
        <ToolsNav />
      </div>
    )}
  </div>
);

NavBarMobile.propTypes = {
  hamburgerIsOpen: PropTypes.bool,
  routes: PropTypes.array
};

export default NavBarMobile;
