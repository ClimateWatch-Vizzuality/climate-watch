import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import styles from './bottom-bar-styles.scss';

const BottomBar = ({ className }) => (
  <div className={styles.container}>
    <div className={cx(styles.bottomBar, className)}>
      <div>
        <Link className={styles.text} to="/terms">
          Terms of Service
        </Link>
        <span className={styles.text}> - </span>
        <Link className={styles.text} to="/privacy">
          Privacy
        </Link>
      </div>
      <div>
        <span className={styles.text}>© 2017 - Climate Watch</span>
      </div>
    </div>
  </div>
);

BottomBar.propTypes = {
  className: PropTypes.string
};

export default BottomBar;
