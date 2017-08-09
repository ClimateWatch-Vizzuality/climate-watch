import React from 'react';

import layout from 'styles/layout.scss';
import styles from './topbar-styles.scss';

export default () => (
  <div className={styles.topbar}>
    <div className={layout.content}>
      <a href="http://www.wri.org/" className={styles.wriLogo} target="_blank" rel="noopener noreferrer">
        <img src="" alt="WRI Logo" />
        WORLD RESOURCE INSTITUTE
      </a>
    </div>
  </div>
);
