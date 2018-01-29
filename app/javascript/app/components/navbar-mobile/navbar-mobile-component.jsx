import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classNames';

import Icon from 'components/icon';
import Hamburger from 'components/hamburger';
import Nav from 'components/nav';
import ToolsNav from 'components/tools-nav';
import Contact from 'components/contact';

// import contactIcon from 'assets/icons/contact.svg';
import cwLogo from 'assets/icons/cw-logo.svg';
import styles from './navbar-mobile-styles.scss';

const NavBarMobile = ({ routes, hamburgerIsOpen }) => (
  <div className={styles.navbarMobile}>
    <div className={cx(styles.navbar, hamburgerIsOpen ? styles.isOpen : '')}>
      <NavLink exact to="/">
        <Icon className={styles.logo} icon={cwLogo} />
      </NavLink>
      <Hamburger text={'MENU'} />
    </div>
    {hamburgerIsOpen && (
      <div className={styles.fullMenu}>
        <Nav routes={routes} allowNested={false} className={styles.navMenu} />
        <div className={styles.toolsContainer}>
          <ToolsNav />
          <Contact />
        </div>
      </div>
    )}
  </div>
);

NavBarMobile.propTypes = {
  hamburgerIsOpen: PropTypes.bool,
  routes: PropTypes.array
};

export default NavBarMobile;
