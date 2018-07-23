import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';

import { Desktop } from 'components/responsive';
import Icon from 'components/icon';
import SimpleMenu from 'components/simple-menu';
import NavNestedMenu from 'components/nav/nav-nested-menu';
import NavWithChildMenu from 'components/navbar-mobile/nav-with-child-menu';

import cwLogo from 'assets/icons/cw-logo.svg';
import styles from './nav-styles.scss';

class Nav extends PureComponent {
  render() {
    const {
      routes,
      className,
      hideActive,
      reverse,
      isRendered,
      allowNested,
      isMobile,
      closeMenu
    } = this.props;

    return (
      <nav className={cx(styles.navbar, className)}>
        <Desktop>
          <NavLink exact className={styles.link} to="/">
            <Icon className={styles.logo} icon={cwLogo} />
          </NavLink>
        </Desktop>
        {routes.map(route => {
          if (route.navNestedMenu && allowNested) {
            return (
              <NavNestedMenu
                key={route.label}
                reverse={reverse}
                isRendered={isRendered}
                title={route.label}
                className={styles.link}
                Child={route.Child}
              />
            );
          }
          if (route.path) {
            return (
              <NavLink
                key={route.path}
                className={styles.link}
                activeClassName={hideActive ? '' : styles.active}
                to={route.path}
                onClick={isMobile ? closeMenu : null}
              >
                {route.label}
              </NavLink>
            );
          }
          if (isMobile) {
            return (
              <NavWithChildMenu
                key={route.label}
                options={route.routes}
                title={route.label}
              />
            );
          }
          return (
            <SimpleMenu
              key={route.label}
              options={route.routes}
              title={route.label}
              buttonClassName={cx(styles.link, styles.menuLink)}
              reverse={reverse}
              positionRight
            />
          );
        })}
      </nav>
    );
  }
}

Nav.propTypes = {
  hideActive: PropTypes.bool.isRequired,
  allowNested: PropTypes.bool.isRequired,
  reverse: PropTypes.bool,
  isRendered: PropTypes.bool,
  routes: PropTypes.array.isRequired,
  className: PropTypes.string,
  isMobile: PropTypes.bool,
  closeMenu: PropTypes.func
};

Nav.defaultProps = {
  routes: [],
  hideActive: false,
  allowNested: true,
  isMobile: false
};

export default Nav;
