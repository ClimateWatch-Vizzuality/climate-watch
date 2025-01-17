import React from 'react';
import PropTypes from 'prop-types';

import { ChangeBarComponent } from '../components';

const ReductionsComponent = ({ margins, dimensions, scales, data }) => {
  if (!margins || !dimensions || !scales || !data) return null;

  const baseReductions = {
    value: 8,
    legend: ['Emission reductions', 'pledged in 2020 NDCs'],
    color: '#999C9F',
    position: {
      x: scales.x(2030),
      y: scales.y(data?.['2030']?.target)
    },
    height: scales.y(data?.['2030']?.actual) - scales.y(data?.['2030']?.target)
  };

  const additionalReductions = {
    value: 1,
    legend: ['Additional emission', 'reductions from', 'Unconditional 2025 NDCs'],
    color: '#0845CB',
    position: {
      x: scales.x(2035),
      y: scales.y(data?.['2035']?.target)
    },
    height: scales.y(data?.['2035']?.actual) - scales.y(data?.['2035']?.target)
  };

  return (
    <>
      {/* Emissions Reductions */}
      <ChangeBarComponent
        type="emission-reductions"
        margins={margins}
        dimensions={dimensions}
        position={baseReductions?.position}
        height={baseReductions?.height}
        value={baseReductions?.value}
        legend={baseReductions?.legend}
        color={baseReductions?.color}
        displayArrow={false}
        displayLimitCircles
      />
      {/* Additional Reductions */}
      <ChangeBarComponent
        type="emission-additional-reductions"
        margins={margins}
        dimensions={dimensions}
        position={additionalReductions?.position}
        height={additionalReductions?.height}
        value={additionalReductions?.value}
        legend={additionalReductions?.legend}
        color={additionalReductions?.color}
        displayValueInCircle
      />
    </>
  );
};

ReductionsComponent.propTypes = {
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

export default ReductionsComponent;
