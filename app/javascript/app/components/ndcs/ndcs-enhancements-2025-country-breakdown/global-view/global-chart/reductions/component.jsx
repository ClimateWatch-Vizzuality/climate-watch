import React from 'react';

import { chartConfigPropTypes } from '../../index';
import { ChangeBarComponent } from '../components';

const BASE_REDUCTIONS_YEAR = 2030;
const ADDITIONAL_REDUCTIONS_YEAR = 2035;

const LIMITS_DISPLAY_OFFSETS = {
  baseReductions: 5,
  additionalReductions: 10
};

const ReductionsComponent = ({ chartConfig = {} }) => {
  const { data: allData, options, margins, dimensions, scales } = chartConfig;
  const reductionsData = allData?.reductions;

  if (!reductionsData || !margins || !dimensions || !scales) return null;

  const baseReductions = {
    value:
      reductionsData?.[BASE_REDUCTIONS_YEAR]?.target -
      reductionsData?.[BASE_REDUCTIONS_YEAR]?.actual,
    valueFormat: ',.1f',
    legend: ['Emission reductions', 'pledged in 2020 NDCs'],
    color: '#999C9F',
    position: {
      x: scales.x(2030),
      y: scales.y(reductionsData?.[BASE_REDUCTIONS_YEAR]?.target)
    },
    height:
      scales.y(reductionsData?.[BASE_REDUCTIONS_YEAR]?.actual) -
      scales.y(reductionsData?.[BASE_REDUCTIONS_YEAR]?.target),
    connectingLines: {
      lower: {
        value: reductionsData?.[BASE_REDUCTIONS_YEAR]?.actual,
        offset: -LIMITS_DISPLAY_OFFSETS.baseReductions
      }
    }
  };

  const additionalReductions = {
    value:
      reductionsData?.[ADDITIONAL_REDUCTIONS_YEAR]?.target -
      reductionsData?.[ADDITIONAL_REDUCTIONS_YEAR]?.actual,
    legend: [
      'Additional emission',
      'reductions from',
      options?.conditionalNdc
        ? 'conditional 2025 NDCs'
        : 'unconditional 2025 NDCs'
    ],
    color: '#0845CB',
    position: {
      x: scales.x(2035),
      y: scales.y(reductionsData?.[ADDITIONAL_REDUCTIONS_YEAR]?.target)
    },
    height:
      scales.y(reductionsData?.[ADDITIONAL_REDUCTIONS_YEAR]?.actual) -
      scales.y(reductionsData?.[ADDITIONAL_REDUCTIONS_YEAR]?.target),
    connectingLines: {
      lower: {
        value: reductionsData?.[ADDITIONAL_REDUCTIONS_YEAR]?.actual,
        offset: LIMITS_DISPLAY_OFFSETS.additionalReductions
      }
    }
  };

  return (
    <>
      {/* Emissions Reductions */}
      <ChangeBarComponent
        type="emission-reductions"
        scales={scales}
        margins={margins}
        dimensions={dimensions}
        position={baseReductions?.position}
        height={baseReductions?.height}
        value={baseReductions?.value}
        valueFormat={baseReductions?.valueFormat}
        legend={baseReductions?.legend}
        color={baseReductions?.color}
        displayArrow={false}
        connectingLines={baseReductions?.connectingLines}
        displayLimitCircles
      />
      {/* Additional Reductions */}
      <ChangeBarComponent
        type="emission-additional-reductions"
        scales={scales}
        margins={margins}
        dimensions={dimensions}
        position={additionalReductions?.position}
        height={additionalReductions?.height}
        value={additionalReductions?.value}
        valueFormat={baseReductions?.valueFormat}
        legend={additionalReductions?.legend}
        color={additionalReductions?.color}
        connectingLines={additionalReductions?.connectingLines}
        displayValueInCircle
      />
    </>
  );
};

ReductionsComponent.propTypes = {
  chartConfig: chartConfigPropTypes
};

export default ReductionsComponent;
