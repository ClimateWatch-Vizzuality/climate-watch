import React from 'react';
import Progress from 'components/progress';
import PropTypes from 'prop-types';
import styles from './legend-item-styles.scss';

const LegendItem = ({ name, partiesNumber, value, color }) => (
  <div className={styles.legendItem}>
    <div>
      <span className={styles.legendDot} style={{ backgroundColor: color }} />
      {name}
    </div>
    <div className={styles.progressContainer}>
      <Progress value={value} className={styles.progressBar} color={color} />
      <div className={styles.partiesNumber}>
        {partiesNumber} {partiesNumber === 1 ? 'party' : 'parties'}
      </div>
    </div>
  </div>
);

LegendItem.propTypes = {
  name: PropTypes.string,
  partiesNumber: PropTypes.number,
  value: PropTypes.number,
  color: PropTypes.string
};

export default LegendItem;
