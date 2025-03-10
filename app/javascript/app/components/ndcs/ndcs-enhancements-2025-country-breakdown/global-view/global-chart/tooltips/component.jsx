import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format } from 'd3-format';

import TooltipComponent from '../components/tooltip';
import { TOOLTIPS } from '../constants';

const TooltipsComponent = ({ data }) => {
  if (!data) return null;

  const formatGtValue = value => {
    if (value % 1 === 0) return `${value}Gt`;
    const formattedGtValue = format('.1f')(value);
    return `${formattedGtValue}Gt`;
  };

  const tooltipValues = useMemo(() => {
    const historical = formatGtValue(
      data?.historical?.[data?.historical?.length - 1]?.y
    );
    const reductions = {
      2030: {
        label: `2030 - ${
          data?.isConditionalNDC ? 'Conditional' : 'Unconditional'
        } 2020 NDC`,
        value: formatGtValue(data?.reductions?.['2035']?.actual),
        upperLimit: '',
        lowerLimit: formatGtValue(data?.reductions?.['2035']?.actual)
      },
      2035: formatGtValue(
        data?.reductions?.['2035']?.actual - data?.reductions?.['2035']?.target
      )
    };
    const targets = {
      2035: {
        '2.0C': formatGtValue(data?.targets?.[2035]?.['2.0C']),
        '1.5C': formatGtValue(data?.targets?.[2035]?.['1.5C'])
      }
    };
    const targetGaps = {
      upperLimit: formatGtValue(
        data?.targetGaps?.upperLimit?.target -
          data?.targetGaps?.upperLimit?.actual
      ),
      lowerLimit: formatGtValue(
        data?.targetGaps?.lowerLimit?.target -
          data?.targetGaps?.lowerLimit?.actual
      )
    };

    return { historical, reductions, targets, targetGaps };
  }, [data]);

  if (!tooltipValues) return null;

  return (
    <>
      {/* Historical data */}
      <TooltipComponent
        id={TOOLTIPS.historical.marker.id}
        label={TOOLTIPS.historical.marker.label}
        color={TOOLTIPS.historical.marker.color}
        value={tooltipValues?.historical}
      />

      {/* Targets */}
      <TooltipComponent
        id={TOOLTIPS.targets[2035]['2.0C'].id}
        label={TOOLTIPS.targets[2035]['2.0C'].label}
        color={TOOLTIPS.targets[2035]['2.0C'].color}
        value={tooltipValues?.targets[2035]['2.0C']}
      />
      <TooltipComponent
        id={TOOLTIPS.targets[2035]['1.5C'].id}
        label={TOOLTIPS.targets[2035]['1.5C'].label}
        color={TOOLTIPS.targets[2035]['1.5C'].color}
        value={tooltipValues?.targets[2035]['1.5C']}
      />

      {/* Reductions */}
      <TooltipComponent
        id={TOOLTIPS.reductions.emissionsReductions.id}
        label={TOOLTIPS.reductions.emissionsReductions.label}
        color={TOOLTIPS.reductions.emissionsReductions.color}
        value={tooltipValues?.reductions?.[2030]?.value}
      />
      <TooltipComponent
        id={TOOLTIPS.reductions.emissionsReductions.markers.upperLimit.id}
        label={TOOLTIPS.reductions.emissionsReductions.markers.upperLimit.label}
        color={TOOLTIPS.reductions.emissionsReductions.markers.upperLimit.color}
        value={tooltipValues?.reductions?.[2030]?.upperLimit}
      />
      <TooltipComponent
        id={TOOLTIPS.reductions.emissionsReductions.markers.lowerLimit.id}
        label={tooltipValues?.reductions?.[2030]?.label}
        color={TOOLTIPS.reductions.emissionsReductions.markers.lowerLimit.color}
        value={tooltipValues?.reductions?.[2030]?.lowerLimit}
      />

      <TooltipComponent
        id={TOOLTIPS.reductions.additionalReductions.id}
        label={TOOLTIPS.reductions.additionalReductions.label}
        color={TOOLTIPS.reductions.additionalReductions.color}
        value={tooltipValues?.reductions?.[2035]}
      />

      {/* Target gaps */}
      <TooltipComponent
        id={TOOLTIPS.targetGaps.upperLimit.id}
        label={TOOLTIPS.targetGaps.upperLimit.label}
        color={TOOLTIPS.targetGaps.upperLimit.color}
        value={tooltipValues?.targetGaps?.upperLimit}
      />
      <TooltipComponent
        id={TOOLTIPS.targetGaps.lowerLimit.id}
        label={TOOLTIPS.targetGaps.lowerLimit.label}
        color={TOOLTIPS.targetGaps.lowerLimit.color}
        value={tooltipValues?.targetGaps?.lowerLimit}
      />
    </>
  );
};

TooltipsComponent.propTypes = {
  data: PropTypes.object
};

export default TooltipsComponent;
