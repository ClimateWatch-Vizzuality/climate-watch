import React from 'react';
import { NavLink } from 'react-router-dom';
import DownloadMenu from 'components/download-menu';
import ShareMenu from 'components/share-menu';
import cx from 'classnames';
import PropTypes from 'prop-types';

import styles from './tools-nav-styles.scss';

const FEATURE_MY_CLIMATEWATCH = process.env.FEATURE_MY_CLIMATEWATCH === 'true';
const FEATURE_DATA_EXPLORER = process.env.FEATURE_DATA_EXPLORER === 'true';
const mycwLinkConfig = FEATURE_MY_CLIMATEWATCH
  ? { to: '/my-climate-watch', title: 'My climate watch' }
  : { to: '', disabled: true, title: 'Coming soon' };

const DataExplorerLink = (
  <NavLink
    className={cx(styles.link, styles.noWrap, {})}
    activeClassName={styles.linkActive}
    to="/data-explorer"
    title="Data Explorer"
  >
    {' '}
    DATA EXPLORER
  </NavLink>
);
const ToolsNav = ({ className, reverse }) => (
  <div className={cx(styles.toolsNav, className)}>
    <NavLink
      className={cx(styles.link, styles.myCwButton, styles.noWrap, {
        [styles.disabled]: mycwLinkConfig.disabled
      })}
      activeClassName={styles.linkActive}
      {...mycwLinkConfig}
    >
      MY CW
    </NavLink>
    {FEATURE_DATA_EXPLORER ? (
      DataExplorerLink
    ) : (
      <DownloadMenu
        className={cx(styles.iconButton, styles.downloadButton)}
        reverse={reverse}
      />
    )}
    <ShareMenu
      className={cx(styles.iconButton, styles.shareButton)}
      reverse={reverse}
    />
  </div>
);

ToolsNav.propTypes = {
  className: PropTypes.string,
  reverse: PropTypes.bool
};

ToolsNav.defaultProps = {
  reverse: false
};

export default ToolsNav;
