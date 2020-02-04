import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'd3-format';

// import styles from './axis-ticks-styles.scss';

export const CustomXAxisTick = ({ x, y, payload, customStrokeWidth }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x="15"
      y="0"
      dy="16"
      textAnchor="end"
      stroke="#868697"
      strokeWidth={customStrokeWidth || '0.5'}
      fontSize="13px"
    >
      {payload.value}
    </text>
  </g>
);

export const CustomYAxisTick = ({ x, y, payload, customStrokeWidth, unit }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x="5"
      y="4"
      dy="0"
      textAnchor="end"
      stroke="#1B2036"
      strokeWidth={customStrokeWidth || '0.5'}
      fontSize="13px"
    >
      {payload.value === 0 ? '0' : `${format('.2s')(payload.value)}${unit}`}
    </text>
  </g>
);

CustomXAxisTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.object,
  customStrokeWidth: PropTypes.string
};

CustomYAxisTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.object,
  customStrokeWidth: PropTypes.string,
  unit: PropTypes.string
};

export default { CustomXAxisTick, CustomYAxisTick };
