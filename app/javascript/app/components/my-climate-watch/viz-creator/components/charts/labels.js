import React from 'react';
import PropTypes from 'prop-types';

import { Label } from 'recharts';

export const yAxisUnitLabel = unit => (
  <Label
    position="top"
    content={() => (
      <text x="22" y="20">
        {unit}
      </text>
    )}
  />
);

export const yAxisIndicatorLabel = (label, height) => (
  <Label
    position="left"
    angle={-90}
    content={() => (
      <text
        x={height * -0.5}
        y="15"
        textAnchor="middle"
        transform="rotate(-90)"
      >
        {label}
      </text>
    )}
  />
);

export const CustomizedYAxisTick = ({ payload, unit, x, y }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x="0"
      y="0"
      dy="0"
      textAnchor="end"
      stroke="#b1b1c1"
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
  yAxisIndicatorLabel,
  CustomizedYAxisTick
};
