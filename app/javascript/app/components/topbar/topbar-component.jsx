import React from 'react';
import Icon from 'components/icon';

import logoWri from 'assets/icons/logo-wri.svg';
import layout from 'styles/layout.scss';
import styles from './topbar-styles.scss';

const Topbar = () =>
  (<div className={styles.topbar}>
    <div className={layout.content}>
      <a
        className={styles.wrapper}
        href="http://www.wri.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon icon={logoWri} className={styles.iconLogoWRI} theme={styles} />
      </a>
    </div>
  </div>);

export default Topbar;
