import React from 'react';
import cx from 'classnames';

import layout from 'styles/layout.scss';
import styles from './topbar-styles.scss';

export default () => (
  <div className={styles.topbar}>
    <div className={cx(layout.content, styles.wrapper)}>
      <a href="http://www.wri.org/" target="_blank" rel="noopener noreferrer">
        <img src="" alt="WRI Logo" />
      </a>
    </div>
  </div>
);
