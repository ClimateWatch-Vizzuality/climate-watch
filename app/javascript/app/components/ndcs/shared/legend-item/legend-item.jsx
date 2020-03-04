import React from 'react';
import Progress from 'components/progress';
import PropTypes from 'prop-types';
import styles from './legend-item-styles.scss';

const LegendItem = ({ name, number, value, color, itemsName }) => (
  <div className={styles.legendItem}>
    <div>
      <span className={styles.legendDot} style={{ backgroundColor: color }} />
      {name}
    </div>
    <div className={styles.progressContainer}>
      <Progress value={value} className={styles.progressBar} color={color} />
      <div className={styles.partiesNumber}>
        {number} {number === 1 ? itemsName[0] : itemsName[1]}
      </div>
    </div>
  </div>
);

LegendItem.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  itemsName: PropTypes.array,
  value: PropTypes.number,
  color: PropTypes.string
};

LegendItem.defaultProps = {
  itemsName: ['party', 'parties']
};

export default LegendItem;
