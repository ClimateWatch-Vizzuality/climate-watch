import React from 'react';
import PropTypes from 'prop-types';

import styles from './indicator-styles.scss';

function Indicator({ name, value }) {
  return (
    <div className={styles.indicator}>
      <div className={styles.value}>{value}</div>
      <div className={styles.label}>{name}</div>
    </div>
  );
}

Indicator.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string
};

export default Indicator;
