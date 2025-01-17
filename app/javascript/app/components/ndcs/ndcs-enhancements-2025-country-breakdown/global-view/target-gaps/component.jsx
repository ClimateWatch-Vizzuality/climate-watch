import React from 'react';
import PropTypes from 'prop-types';

import { ChangeBarComponent } from '../components';

const LIMITS_DISPLAY_OFFSETS = {
  upperLimit: 160,
  lowerLimit: 320
};

const TargetGapsComponent = ({ margins, dimensions, scales, data }) => {
  if (!margins || !dimensions || !scales || !data) return null;

  // Upper limit (2.0C)
  const upperLimit = {
    value: 19,
    legend: ['Remaining gap to', 'stay within 2°C', 'limit'],
    color: '#579B7D',
    position: {
      x: scales.x(2035) + LIMITS_DISPLAY_OFFSETS.upperLimit,
      y: scales.y(data?.upperLimit?.target)
    },
    height:
      scales.y(data?.upperLimit?.actual) - scales.y(data?.upperLimit?.target)
  };

  // Lower limit (1.5C)
  const lowerLimit = {
    value: 30,
    legend: ['Remaining gap to', 'stay within 1.5°C', 'limit'],
    color: '#8CB73F',
    position: {
      x: scales.x(2035) + LIMITS_DISPLAY_OFFSETS.lowerLimit,
      y: scales.y(data?.lowerLimit?.target)
    },
    height:
      scales.y(data?.lowerLimit?.actual) - scales.y(data?.lowerLimit?.target)
  };

  return (
    <>
      {/* Upper limit (2.0C) */}
      <ChangeBarComponent
        type="gap-upper-limit"
        margins={margins}
        dimensions={dimensions}
        position={upperLimit?.position}
        height={upperLimit?.height}
        value={upperLimit?.value}
        legend={upperLimit?.legend}
        color={upperLimit?.color}
      />
      {/* Lower limit (1.5C) */}
      <ChangeBarComponent
        type="gap-lower-limit"
        margins={margins}
        dimensions={dimensions}
        position={lowerLimit?.position}
        height={lowerLimit?.height}
        value={lowerLimit?.value}
        legend={lowerLimit?.legend}
        color={lowerLimit?.color}
      />
    </>
  );
};

TargetGapsComponent.propTypes = {
  data: PropTypes.any.isRequired,
  scales: PropTypes.shape({
    x: PropTypes.func.isRequired,
    y: PropTypes.func.isRequired
  }),
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }),
  margins: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired
  })
};

export default TargetGapsComponent;
