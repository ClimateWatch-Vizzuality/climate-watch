import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './circular-chart-styles.scss';

class CircularChart extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { value } = this.props;
    return (
      <div className={styles.singleChart}>
        <svg viewBox="0 0 36 36" className={styles.circularChart}>
          <path
            className={styles.circleBg}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={styles.circle}
            strokeDasharray={`${value}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" className={styles.percentage}>
            {value}%
          </text>
        </svg>
      </div>
    );
  }
}

CircularChart.propTypes = {
  value: PropTypes.number.isRequired
};

export default CircularChart;
