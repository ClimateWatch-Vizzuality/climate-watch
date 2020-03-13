import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from 'components/icon';
import Hamburger from 'components/hamburger';
import Nav from 'components/nav';
import ToolsNav from 'components/tools-nav';
import Contact from 'components/contact';
import cwLogo from 'assets/icons/cw-logo.svg';
import mobileMenuNavTheme from 'styles/themes/nav/mobile-menu-nav.scss';
import mobileToolsNavTheme from 'styles/themes/tools-nav/mobile-tools-nav.scss';
import styles from './navbar-mobile-styles.scss';

const NavBarMobile = ({ closeMenu, hamburgerIsOpen, routes }) => (
  <div className={styles.navbarMobile} id="navBarMobile">
    <div className={cx(styles.navbar, hamburgerIsOpen ? styles.isOpen : '')}>
      <NavLink exact to="/" onClick={closeMenu} className={styles.homeLink}>
        <Icon className={styles.logo} icon={cwLogo} />
      </NavLink>
      <Hamburger />
    </div>
    {hamburgerIsOpen && (
      <div className={styles.navigation}>
        <div className="grid-layout-element">
          <Nav
            routes={routes}
            allowNested={false}
            theme={mobileMenuNavTheme}
            activeClassName={styles.active}
            isMobile
          />
          <div className={styles.separator} />
          <div className={styles.toolsContainer}>
            <ToolsNav
              className={styles.tools}
              theme={mobileToolsNavTheme}
              reverse
            />
          </div>
          <Contact className={styles.menuContact} />
        </div>
      </div>
    )}
  </div>
);

NavBarMobile.propTypes = {
  hamburgerIsOpen: PropTypes.bool,
  routes: PropTypes.array,
  closeMenu: PropTypes.func
};

export default NavBarMobile;
