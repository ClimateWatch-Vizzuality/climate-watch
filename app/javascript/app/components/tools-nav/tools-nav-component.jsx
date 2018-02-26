import React from 'react';
import { NavLink } from 'react-router-dom';
import DownloadMenu from 'components/download-menu';
import ShareMenu from 'components/share-menu';
import cx from 'classnames';
import PropTypes from 'prop-types';

import styles from './tools-nav-styles.scss';

const ToolsNav = ({ className, reverse }) => (
  <div className={cx(styles.toolsNav, className)}>
    <NavLink
      className={cx(styles.link, styles.myCwButton)}
      activeClassName={styles.linkActive}
      to="/my-climate-watch"
      title="My climate watch"
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
