import React from 'react';
import { NavLink } from 'react-router-dom';

import layout from 'styles/layout.scss';
import styles from './nav-styles.scss';

export default () => (
  <div className={styles.topbar}>
    <div className={layout.content}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/ndc">NDC</NavLink>
    </div>
  </div>
);
