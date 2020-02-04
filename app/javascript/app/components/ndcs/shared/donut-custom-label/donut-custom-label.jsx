import React from 'react';
import PropTypes from 'prop-types';

const CustomInnerHoverLabel = ({ x, y, value }) => (
  <text x={x} y={y - 18}>
    <tspan x={x} textAnchor="middle">
      {Math.round(value * 1000) / 10} %
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
