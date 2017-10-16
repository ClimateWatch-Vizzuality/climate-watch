import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from 'components/icon';

import download from 'assets/icons/download.svg';
import styles from './tools-nav-styles.scss';

const ToolsNav = () =>
  (<div className={styles.toolsNav}>
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
  </div>);

export default ToolsNav;
