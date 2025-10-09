import React from 'react';

import { chartConfigPropTypes } from '../../index';
import { ChangeBarComponent } from '../components';
import { TOOLTIPS } from '../constants';

const ADDITIONAL_REDUCTIONS_YEAR = 2035;

const LIMITS_DISPLAY_OFFSETS = {
  baseReductions: 5,
  additionalReductions: 10
};

const ReductionsComponent = ({ chartConfig = {} }) => {
  const { data: allData, margins, dimensions, scales } = chartConfig;
  const reductionsData = allData?.reductions;

  if (!reductionsData || !margins || !dimensions || !scales) return null;

  const baseReductions = {
    value: 0,
    valueFormat: ',.1f',
    legend: [
      'Estimated emissions',
      'based on previous',
      `${allData?.isConditionalNDC ? 'conditional' : 'unconditional'} NDCs`
    ],
    color: '#999C9F',
    position: {
      x: scales.x(2030),
      y: scales.y(reductionsData?.[ADDITIONAL_REDUCTIONS_YEAR]?.actual)
    },
    height: 0,
    connectingLines: {
      lower: {
        value: reductionsData?.[ADDITIONAL_REDUCTIONS_YEAR]?.actual,
        offset: -LIMITS_DISPLAY_OFFSETS.baseReductions
      }
    }
  };

  const additionalReductions = {
    value:
      reductionsData?.[ADDITIONAL_REDUCTIONS_YEAR]?.actual -
      reductionsData?.[ADDITIONAL_REDUCTIONS_YEAR]?.target,
    legend: [
      'Additional emission',
      'reductions from new',
      allData?.isConditionalNDC ? 'conditional NDCs' : 'unconditional NDCs'
    ],
    color: '#0845CB',
    position: {
      x: scales.x(2035),
      y: scales.y(reductionsData?.[ADDITIONAL_REDUCTIONS_YEAR]?.actual)
    },
    height:
      scales.y(reductionsData?.[ADDITIONAL_REDUCTIONS_YEAR]?.target) -
      scales.y(reductionsData?.[ADDITIONAL_REDUCTIONS_YEAR]?.actual),
    connectingLines: {
      lower: {
        value: reductionsData?.[ADDITIONAL_REDUCTIONS_YEAR]?.target,
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
        tooltipId={TOOLTIPS.reductions.emissionsReductions.id}
        upperLimitTooltipId={''}
        lowerLimitTooltipId={
          TOOLTIPS.reductions.emissionsReductions.markers.lowerLimit.id
        }
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
        tooltipId={TOOLTIPS.reductions.additionalReductions.id}
      />
    </>
  );
};

ReductionsComponent.propTypes = {
  chartConfig: chartConfigPropTypes
};

export default ReductionsComponent;
