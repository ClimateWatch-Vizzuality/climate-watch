import React from 'react';

import { chartConfigPropTypes } from '../index';
import { ChangeBarComponent } from '../components';

const LIMITS_DISPLAY_OFFSETS = {
  upperLimit: 160,
  lowerLimit: 320
};

const TargetGapsComponent = ({ chartConfig = {} }) => {
  const { data: allData, margins, dimensions, scales } = chartConfig;
  const targetGapsData = allData?.targetGaps;

  if (!targetGapsData || !margins || !dimensions || !scales) return null;

  // Upper limit (2.0C)
  const upperLimit = {
    value: 19,
    legend: ['Remaining gap to', 'stay within 2°C', 'limit'],
    color: '#579B7D',
    position: {
      x: scales.x(2035) + LIMITS_DISPLAY_OFFSETS.upperLimit,
      y: scales.y(targetGapsData?.upperLimit?.target)
    },
    height:
      scales.y(targetGapsData?.upperLimit?.actual) -
      scales.y(targetGapsData?.upperLimit?.target)
  };

  // Lower limit (1.5C)
  const lowerLimit = {
    value: 30,
    legend: ['Remaining gap to', 'stay within 1.5°C', 'limit'],
    color: '#8CB73F',
    position: {
      x: scales.x(2035) + LIMITS_DISPLAY_OFFSETS.lowerLimit,
      y: scales.y(targetGapsData?.lowerLimit?.target)
    },
    height:
      scales.y(targetGapsData?.lowerLimit?.actual) -
      scales.y(targetGapsData?.lowerLimit?.target)
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
  chartConfig: chartConfigPropTypes
};

export default TargetGapsComponent;
