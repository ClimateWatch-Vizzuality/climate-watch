import React from 'react';
import PropTypes from 'prop-types';
import { COUNTRY_COMPARE_COLORS } from 'data/constants';
import styles from './circular-chart-styles.scss';

const radius = index => (100 + index * 20) / (3.14159 * 2); // eslint-disable-line no-mixed-operators
const diameter = index => radius(index) * 2;
const normalizedCircunference = index => 3.14159 * diameter(index);
const arcLength = (value, index) =>
  360 * value / 100 / 360 * normalizedCircunference(index); // eslint-disable-line no-mixed-operators

const CircularChart = ({ value, index }) => (
  <div className={styles.circularChartWrapper}>
    <svg viewBox="0 0 50 50" className={styles.circularChart}>
      <circle
        r={radius(index)}
        cx="25"
        cy="25"
        className={styles.circleEmpty}
      />
      <circle
        r={radius(index)}
        cx="25"
        cy="25"
        className={styles.circleValue}
        strokeDasharray={`${arcLength(value, index)}, ${normalizedCircunference(
          index
        )}`}
        style={{ stroke: COUNTRY_COMPARE_COLORS[index] }}
      />
    </svg>
  </div>
);

CircularChart.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};

export default CircularChart;
