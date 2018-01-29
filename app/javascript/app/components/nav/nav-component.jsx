import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';

import { TabletLandscape } from 'components/responsive';
import Icon from 'components/icon';
import SimpleMenu from 'components/simple-menu';
import NavNestedMenu from 'components/nav/nav-nested-menu';

import cwLogo from 'assets/icons/cw-logo.svg';
import styles from './nav-styles.scss';

class Nav extends PureComponent {
  render() {
    const {
      location,
      routes,
      className,
      hideLogo,
      hideActive,
      reverse,
      isRendered,
      allowNested
    } = this.props;

    const showLogo = !hideLogo && location.pathname !== '/';
    return (
      <nav className={cx(styles.navbar, className)}>
        <TabletLandscape>
          {showLogo && (
            <NavLink exact className={styles.link} to="/">
              <Icon className={styles.logo} icon={cwLogo} />
            </NavLink>
          )}
        </TabletLandscape>
        {routes.map(route => {
          if (route.navNestedMenu && allowNested) {
            return (
              <NavNestedMenu
                key={route.label}
                reverse={reverse}
                isRendered={isRendered}
                title={route.label}
                className={cx(styles.link, styles.menuLink)}
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
              >
                {route.label}
              </NavLink>
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
  hideLogo: PropTypes.bool.isRequired,
  hideActive: PropTypes.bool.isRequired,
  allowNested: PropTypes.bool.isRequired,
  reverse: PropTypes.bool,
  isRendered: PropTypes.bool,
  routes: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  className: PropTypes.string
};

Nav.defaultProps = {
  routes: [],
  hideLogo: false,
  hideActive: false,
  allowNested: true
};

export default Nav;
