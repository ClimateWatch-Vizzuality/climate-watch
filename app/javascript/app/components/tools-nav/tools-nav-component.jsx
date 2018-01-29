import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from 'components/icon';
import ShareMenu from 'components/share-menu';
import cx from 'classnames';
import PropTypes from 'prop-types';

import download from 'assets/icons/download.svg';
import styles from './tools-nav-styles.scss';

const ToolsNav = ({ className }) => (
  <div className={cx(styles.toolsNav, className)}>
    <NavLink
      className={cx(styles.link, styles.disabled)}
      activeClassName={styles.linkActive}
      to=""
      disabled
      title="Coming soon"
    >
      MY CW
    </NavLink>
    <a
      href="//climate-watch-dev.s3.amazonaws.com/climate-watch-download-zip/data-download.zip"
      className={styles.link}
      title="Download all Climate Watch data"
    >
      <Icon className={styles.download} icon={download} />
    </a>
    <ShareMenu className={styles.shareButton} />
  </div>
);

ToolsNav.propTypes = {
  className: PropTypes.string
};

export default ToolsNav;
