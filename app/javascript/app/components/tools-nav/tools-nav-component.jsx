import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import SimpleMenu from 'components/simple-menu';

import download from 'assets/icons/download.svg';
import styles from './tools-nav-styles.scss';

const ToolsNav = ({ shareMenuOptions, shareIcon }) => (
  <div className={styles.toolsNav}>
    <NavLink
      className={styles.link}
      activeClassName={styles.linkActive}
      to="/my-cw"
    >
      MY CW
    </NavLink>
    <NavLink exact className={styles.link} to="/my-downloads">
      <Icon className={styles.download} icon={download} />
    </NavLink>
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
