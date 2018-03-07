import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import styles from './bottom-bar-styles.scss';

const BottomBar = ({ className }) => (
  <div className={styles.container}>
    <div className={cx(styles.row, styles.bottomBar, className)}>
      <Link className={styles.text} to="/about/permissions">
        Permissions & Licensing
      </Link>
      <span className={cx(styles.text, styles.align)}>
        Climate Watch © {new Date().getFullYear()} Powered by Resource Watch
      </span>
    </div>
  </div>
);

BottomBar.propTypes = {
  className: PropTypes.string
};

export default BottomBar;
