import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';

import { Desktop } from 'components/responsive';
import Icon from 'components/icon';
import arrow from 'assets/icons/arrow-down-tiny.svg';
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
      closeMenu,
      activeClassName,
      theme
    } = this.props;
    return (
      <nav className={cx(styles.navbar, className, theme.navbar)}>
        <Desktop>
          <NavLink exact className={cx(styles.link, theme.link)} to="/">
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
                theme={theme}
                Child={route.Child}
              />
            );
          }
          if (route.path) {
            return (
              <NavLink
                key={route.path}
                className={cx(styles.link, theme.link, theme.mainLink)}
                activeClassName={
                  activeClassName || cx({ [styles.active]: !hideActive })
                }
                to={route.path}
                onClick={isMobile ? closeMenu : null}
              >
                <span>{route.label}</span>
                <Icon
                  icon={arrow}
                  className={cx(styles.arrowIcon, theme.arrowIcon)}
                />
              </NavLink>
            );
          }
          if (isMobile) {
            return (
              <NavWithChildMenu
                key={route.label}
                options={route.routes}
                title={route.label}
                theme={theme}
                activeClassName={activeClassName}
              />
            );
          }
          return (
            <SimpleMenu
              key={route.label}
              options={route.routes}
              title={route.label}
              buttonClassName={cx(
                styles.link,
                styles.menuLink,
                theme.link,
                theme.menuLink
              )}
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
  activeClassName: PropTypes.string,
  isMobile: PropTypes.bool,
  closeMenu: PropTypes.func,
  theme: PropTypes.object
};

Nav.defaultProps = {
  routes: [],
  hideActive: false,
  allowNested: true,
  isMobile: false,
  theme: {}
};

export default Nav;
