import React from 'react';
import { NavLink } from 'react-router-dom';
import DownloadMenu from 'components/download-menu';
import ShareMenu from 'components/share-menu';
import cx from 'classnames';
import PropTypes from 'prop-types';

import styles from './tools-nav-styles.scss';

const FEATURE_MY_CLIMATEWATCH = process.env.FEATURE_MY_CLIMATEWATCH === 'true';
const mycwLinkConfig = FEATURE_MY_CLIMATEWATCH
  ? { to: '/my-climate-watch', title: 'My climate watch' }
  : { to: '', disabled: true, title: 'Coming soon' };

const ToolsNav = ({ className, reverse }) => (
  <div className={cx(styles.toolsNav, className)}>
    <NavLink
      className={cx(styles.link, styles.myCwButton, {
        [styles.disabled]: mycwLinkConfig.disabled
      })}
      activeClassName={styles.linkActive}
      {...mycwLinkConfig}
    >
      MY CW
    </NavLink>
    <DownloadMenu className={styles.downloadButton} reverse={reverse} />
    <ShareMenu className={styles.shareButton} reverse={reverse} />
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
