import React from 'react';
import PropTypes from 'prop-types';

const getPercentage = value =>
  (value < 0.1 / 100 // If the value is less than 0.1 percent
    ? Math.round(value * 10000) / 100
    : Math.round(value * 1000) / 10);

const CustomInnerHoverLabel = ({ x, y, value }) => (
  <text x={x} y={y - 18}>
    <tspan x={x} textAnchor="middle">
      {getPercentage(value)} %
    </tspan>
    <tspan x={x} textAnchor="middle" dy="20">
      of global
    </tspan>
    <tspan x={x} textAnchor="middle" dy="20">
      emissions.
    </tspan>
  </text>
);

CustomInnerHoverLabel.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  value: PropTypes.string
};

export default CustomInnerHoverLabel;
