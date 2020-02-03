import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'recharts';
import styles from './label-styles.scss';

export const yAxisUnitLabel = unit => (
  <Label
    position="top"
    content={() => (
      <text className={styles.label} x="22" y="20">
        {unit}
      </text>
    )}
  />
);

export const pieLabel = (width, y, text) => {
  const getWidth = w => {
    const isPercent = w[w.length - 1] === '%';
    return isPercent ? '50%' : w / 2;
  };
  return (
    <text
      className={styles.label}
      x={getWidth(width)}
      y={y}
      textAnchor="middle"
    >
      {text}
    </text>
  );
};

export const CustomizedYAxisTick = ({ payload, unit, x, y }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x="0"
      y="0"
      dy="0"
      textAnchor="end"
      stroke="#868697"
      strokeWidth="0.5"
      fontSize="13px"
    >
      {`${payload.value}${unit ? '' : 't'}`}
    </text>
  </g>
);

CustomizedYAxisTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.object,
  unit: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

export default {
  yAxisUnitLabel,
  CustomizedYAxisTick,
  pieLabel
};
