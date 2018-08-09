import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Nav from 'components/nav';
import ToolsNav from 'components/tools-nav';
import { isEnabled } from 'features/data-explorer';

import styles from './navbar-styles.scss';

const FEATURE_DATA_EXPLORER = isEnabled();

class NavBar extends PureComponent {
  render() {
    const { routes } = this.props;
    return (
      <div
        className={cx(styles.row, {
          [styles.withDataExplorerLayout]: FEATURE_DATA_EXPLORER
        })}
      >
        <div className={styles.navigationWrapper}>
          <Nav routes={routes} className={styles.navigation} isRendered />
        </div>
        <ToolsNav />
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
