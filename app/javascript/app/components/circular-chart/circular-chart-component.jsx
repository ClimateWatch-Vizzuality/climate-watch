import React from 'react';
import PropTypes from 'prop-types';
import styles from './circular-chart-styles.scss';

const CircularChart = ({
  value,
  index,
  color,
  setRadius,
  setArcLength,
  normalizeCircunference
}) => (
  <div className={styles.circularChartWrapper}>
    <svg viewBox="0 0 50 50" className={styles.circularChart}>
      <circle
        r={setRadius(index)}
        cx="25"
        cy="25"
        className={styles.circleEmpty}
      />
      <circle
        r={setRadius(index)}
        cx="25"
        cy="25"
        className={styles.circleValue}
        strokeDasharray={`${setArcLength(
          value,
          index
        )}, ${normalizeCircunference(index)}`}
        style={{ stroke: color }}
      />
    </svg>
  </div>
);

CircularChart.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  setRadius: PropTypes.func.isRequired,
  setArcLength: PropTypes.func.isRequired,
  normalizeCircunference: PropTypes.func.isRequired
};

export default CircularChart;
