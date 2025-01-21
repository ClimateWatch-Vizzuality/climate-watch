import React from 'react';

import { chartConfigPropTypes } from '../index';
import { ChangeBarComponent } from '../components';

const YEAR = 2035;

const LIMITS_DISPLAY_OFFSETS = {
  upperLimit: 5,
  lowerLimit: 10
};

const TargetGapsComponent = ({ chartConfig = {} }) => {
  const { data: allData, margins, dimensions, scales } = chartConfig;
  const targetGapsData = allData?.targetGaps;
  const reductionsData = allData?.reductions;

  if (
    !targetGapsData ||
    !reductionsData ||
    !margins ||
    !dimensions ||
    !scales
  ) {
    return null;
  }

  // Upper limit (2.0C)
  const upperLimit = {
    value:
      targetGapsData?.upperLimit?.target - targetGapsData?.upperLimit?.actual,
    legend: ['Remaining gap to', 'stay within 2°C', 'limit'],
    color: '#579B7D',
    position: {
      x: scales.x(YEAR + LIMITS_DISPLAY_OFFSETS.upperLimit),
      y: scales.y(targetGapsData?.upperLimit?.target)
    },
    height:
      scales.y(targetGapsData?.upperLimit?.actual) -
      scales.y(targetGapsData?.upperLimit?.target),
    connectingLines: {
      lower: {
        value: targetGapsData?.upperLimit?.actual,
        offset: LIMITS_DISPLAY_OFFSETS.upperLimit
      }
    },
    offset:
      scales.y(reductionsData?.[YEAR]?.actual) -
      scales.y(reductionsData?.[YEAR]?.target)
  };

  // Lower limit (1.5C)
  const lowerLimit = {
    value:
      targetGapsData?.lowerLimit?.target - targetGapsData?.lowerLimit?.actual,
    legend: ['Remaining gap to', 'stay within 1.5°C', 'limit'],
    color: '#8CB73F',
    position: {
      x: scales.x(YEAR + LIMITS_DISPLAY_OFFSETS.lowerLimit),
      y: scales.y(targetGapsData?.lowerLimit?.target)
    },
    height:
      scales.y(targetGapsData?.lowerLimit?.actual) -
      scales.y(targetGapsData?.lowerLimit?.target),
    connectingLines: {
      lower: {
        value: targetGapsData?.lowerLimit?.actual,
        offset: LIMITS_DISPLAY_OFFSETS.lowerLimit
      }
    },
    offset:
      scales.y(reductionsData?.[YEAR]?.actual) -
      scales.y(reductionsData?.[YEAR]?.target)
  };

  return (
    <>
      {/* Upper limit (2.0C) */}
      <ChangeBarComponent
        type="gap-upper-limit"
        scales={scales}
        margins={margins}
        dimensions={dimensions}
        position={upperLimit?.position}
        height={upperLimit?.height}
        value={upperLimit?.value}
        legend={upperLimit?.legend}
        color={upperLimit?.color}
        connectingLines={upperLimit?.connectingLines}
        offset={upperLimit?.offset}
        displayOffsetBars
      />
      {/* Lower limit (1.5C) */}
      <ChangeBarComponent
        type="gap-lower-limit"
        scales={scales}
        margins={margins}
        dimensions={dimensions}
        position={lowerLimit?.position}
        height={lowerLimit?.height}
        value={lowerLimit?.value}
        legend={lowerLimit?.legend}
        color={lowerLimit?.color}
        connectingLines={lowerLimit?.connectingLines}
        offset={upperLimit?.offset}
        displayOffsetBars
      />
    </>
  );
};

TargetGapsComponent.propTypes = {
  chartConfig: chartConfigPropTypes
};

export default TargetGapsComponent;
