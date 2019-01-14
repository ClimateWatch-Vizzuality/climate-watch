import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './data-label-styles.scss';

const DataLabel = ({ name, value, color }) => (
  <div>
    <div className={styles.nameSection}>
      <span className={styles.dot} style={{ backgroundColor: color }} />
      <span className={styles.name}>{name}</span>
    </div>
    <span className={styles.value} style={{ color }}>
      {value}
    </span>
  </div>
);

DataLabel.propTypes = {
  name: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired
};

export default DataLabel;
