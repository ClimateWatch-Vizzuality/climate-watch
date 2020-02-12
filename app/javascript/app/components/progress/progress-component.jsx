import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import cx from 'classnames';

import styles from './progress-styles.scss';

const Progress = ({ value, theme, color, className = '' }) => {
  const classNames = cx(className, theme.icon);
  return (
    <div className={cx(styles.progress, classNames)}>
      {!!value && (
        <div
          className={styles.bar}
          style={{ backgroundColor: color, width: `${value ? value + 1 : 0}%` }}
        />
      )}
    </div>
  );
};

Progress.propTypes = {
  value: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.object
};

Progress.defaultProps = {
  value: 0,
  color: '#ccc'
};

export default themr('Progress', styles)(Progress);
