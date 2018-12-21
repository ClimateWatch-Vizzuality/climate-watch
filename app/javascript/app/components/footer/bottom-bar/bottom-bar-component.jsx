import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Icon } from 'cw-components';

import { RW_WEBSITE } from 'data/constants';
import RW_logo from 'assets/icons/RW_logo';
import RW_text from 'assets/icons/RW_text';

import styles from './bottom-bar-styles.scss';

const BottomBar = ({ className }) => (
  <div className={styles.container}>
    <div className={cx(styles.row, styles.bottomBar, className)}>
      <span className={styles.text}>
        Climate Watch © {new Date().getFullYear()}
      </span>
      <div className={styles.align}>
        <span className={styles.text}>Powered by</span>
        <a href={RW_WEBSITE} target="_blank" rel="noopener noreferrer">
          <Icon icon={RW_logo} theme={{ icon: styles.logo }} />
          <Icon icon={RW_text} theme={{ icon: styles.rwText }} />
        </a>
      </div>
    </div>
  </div>
);

BottomBar.propTypes = {
  className: PropTypes.string
};

export default BottomBar;
