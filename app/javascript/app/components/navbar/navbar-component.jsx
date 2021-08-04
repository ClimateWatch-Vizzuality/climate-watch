import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Nav from 'components/nav';
import cx from 'classnames';
import NotificationBell from 'components/notification-bell';
import styles from './navbar-styles.scss';

class NavBar extends PureComponent {
  render() {
    const { routes } = this.props;
    return (
      <div className={styles.row}>
        <div className={styles.navigationWrapper}>
          <Nav
            routes={routes.filter(r => !r.toolsNav)}
            className={styles.navigation}
            isRendered
          />
        </div>
        <div className={styles.toolsNavWrapper}>
          <Nav
            routes={routes.filter(r => r.toolsNav)}
            className={cx(styles.navigation, styles.toolsNav)}
            noLogo
            isRendered
          />
        </div>
        <NotificationBell />
      </div>
    );
  }
}

NavBar.propTypes = {
  routes: PropTypes.array.isRequired
};

NavBar.defaultProps = {
  routes: []
};

export default NavBar;
