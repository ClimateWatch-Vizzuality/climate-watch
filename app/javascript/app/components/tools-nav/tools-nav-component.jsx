import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import SimpleMenu from 'components/simple-menu';
import cx from 'classnames';

import download from 'assets/icons/download.svg';
import styles from './tools-nav-styles.scss';

const ToolsNav = ({ shareMenuOptions, shareIcon }) => (
  <div className={styles.toolsNav}>
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
      title="Download data"
    >
      <Icon className={styles.download} icon={download} />
    </a>
    <SimpleMenu
      options={shareMenuOptions}
      icon={shareIcon}
      buttonClassName={styles.shareButton}
    />
  </div>
);

ToolsNav.propTypes = {
  shareMenuOptions: PropTypes.array.isRequired,
  shareIcon: PropTypes.object.isRequired
};

export default ToolsNav;
