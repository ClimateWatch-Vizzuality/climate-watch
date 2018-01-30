import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from 'components/icon';
import Hamburger from 'components/hamburger';
import Nav from 'components/nav';
import ToolsNav from 'components/tools-nav';
import Contact from 'components/contact';

// import contactIcon from 'assets/icons/contact.svg';
import cwLogo from 'assets/icons/cw-logo.svg';
import styles from './navbar-mobile-styles.scss';

class NavBarMobile extends Component {
  render() {
    return (
      <div className={styles.navbarMobile}>
        <div
          className={cx(
            styles.navbar,
            this.props.hamburgerIsOpen ? styles.isOpen : ''
          )}
        >
          <NavLink exact to="/">
            <Icon className={styles.logo} icon={cwLogo} />
          </NavLink>
          <Hamburger
            text={'MENU'}
            className={cx(
              styles.hamburgerIcon,
              this.props.hamburgerIsOpen ? styles.isOpen : ''
            )}
          />
        </div>
        {this.props.hamburgerIsOpen && (
          <div className={styles.fullMenu}>
            <Nav
              routes={this.props.routes}
              allowNested={false}
              className={styles.navMenu}
            />
            <div className={styles.toolsContainer}>
              <ToolsNav className={styles.tools} />
              <Contact />
            </div>
          </div>
        )}
      </div>
    );
  }
}

NavBarMobile.propTypes = {
  hamburgerIsOpen: PropTypes.bool,
  routes: PropTypes.array
};

export default NavBarMobile;
