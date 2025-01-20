import React from 'react';

import { chartConfigPropTypes } from '../index';
import { ChangeBarComponent } from '../components';

const ReductionsComponent = ({ chartConfig = {} }) => {
  const { data: allData, margins, dimensions, scales } = chartConfig;
  const reductionsData = allData?.reductions;

  if (!reductionsData || !margins || !dimensions || !scales) return null;

  const baseReductions = {
    value: reductionsData?.['2030']?.target - reductionsData?.['2030']?.actual,
    legend: ['Emission reductions', 'pledged in 2020 NDCs'],
    color: '#999C9F',
    position: {
      x: scales.x(2030),
      y: scales.y(reductionsData?.['2030']?.target)
    },
    height:
      scales.y(reductionsData?.['2030']?.actual) -
      scales.y(reductionsData?.['2030']?.target)
  };

  const additionalReductions = {
    value: reductionsData?.['2035']?.target - reductionsData?.['2035']?.actual,
    legend: [
      'Additional emission',
      'reductions from',
      'Unconditional 2025 NDCs'
    ],
    color: '#0845CB',
    position: {
      x: scales.x(2035),
      y: scales.y(reductionsData?.['2035']?.target)
    },
    height:
      scales.y(reductionsData?.['2035']?.actual) -
      scales.y(reductionsData?.['2035']?.target)
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
  chartConfig: chartConfigPropTypes
};

export default ReductionsComponent;
