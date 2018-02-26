import React from 'react';
import PropTypes from 'prop-types';
import { COUNTRY_COMPARE_COLORS } from 'data/constants';
import styles from './circular-chart-styles.scss';

const CircularChart = ({
  value,
  index,
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
        style={{ stroke: COUNTRY_COMPARE_COLORS[index] }}
      />
    </svg>
  </div>
);

CircularChart.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  setRadius: PropTypes.func.isRequired,
  setArcLength: PropTypes.func.isRequired,
  normalizeCircunference: PropTypes.func.isRequired
};

export default CircularChart;
