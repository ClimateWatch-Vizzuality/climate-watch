import React from 'react';
import PropTypes from 'prop-types';

import layout from 'styles/layout.scss';
import styles from './topbar-styles.scss';

import homer from 'assets/icons/homer.svg';
import Icon from 'components/icon';


export default () => (
  <div className={styles.topbar}>
    <div className={layout.content}>
      <img src="" alt="WRI Logo" />
      <h1>WORLD RESOURCE INSTITUTE</h1>
      <Icon icon={homer} className="homer-icon" />
    </div>
  </div>
);
