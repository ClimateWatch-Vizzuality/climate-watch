import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format } from 'd3-format';

import TooltipComponent from '../components/tooltip';
import { TOOLTIPS } from '../constants';

const TooltipsComponent = ({ data }) => {
  if (!data) return null;

  const formatGtValue = (value) => {
    if (value % 1 === 0) return `${value}Gt`;
    const formattedGtValue = format('.1f')(value);
    return `${formattedGtValue}Gt`;
  };

  const tooltipValues = useMemo(() => {
    const historical = formatGtValue(data?.historical?.[data?.historical?.length - 1]?.y);
    const reductions = {
      2030: {
        value: formatGtValue(
          data?.reductions?.['2030']?.target -
            data?.reductions?.['2030']?.actual
        ),
        upperLimit: formatGtValue(data?.reductions?.['2030']?.target),
        lowerLimit: formatGtValue(data?.reductions?.['2030']?.actual)
      },
      2035: formatGtValue(
        data?.reductions?.['2035']?.target - data?.reductions?.['2035']?.actual
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
        value={tooltipValues?.historical}
      />

      {/* Targets */}
      <TooltipComponent
        id={TOOLTIPS.targets[2035]['2.0C'].id}
        label={TOOLTIPS.targets[2035]['2.0C'].label}
        value={tooltipValues?.targets[2035]['2.0C']}
      />
      <TooltipComponent
        id={TOOLTIPS.targets[2035]['1.5C'].id}
        label={TOOLTIPS.targets[2035]['1.5C'].label}
        value={tooltipValues?.targets[2035]['1.5C']}
      />

      {/* Reductions */}
      <TooltipComponent
        id={TOOLTIPS.reductions.emissionsReductions.id}
        label={TOOLTIPS.reductions.emissionsReductions.label}
        value={tooltipValues?.reductions?.[2030]?.value}
      />
      <TooltipComponent
        id={TOOLTIPS.reductions.emissionsReductions.markers.upperLimit.id}
        label={TOOLTIPS.reductions.emissionsReductions.markers.upperLimit.label}
        value={tooltipValues?.reductions?.[2030]?.upperLimit}
      />
      <TooltipComponent
        id={TOOLTIPS.reductions.emissionsReductions.markers.lowerLimit.id}
        label={TOOLTIPS.reductions.emissionsReductions.markers.lowerLimit.label}
        value={tooltipValues?.reductions?.[2030]?.lowerLimit}
      />

      <TooltipComponent
        id={TOOLTIPS.reductions.additionalReductions.id}
        label={TOOLTIPS.reductions.additionalReductions.label}
        value={tooltipValues?.reductions?.[2035]}
      />

      {/* Target gaps */}
      <TooltipComponent
        id={TOOLTIPS.targetGaps.upperLimit.id}
        label={TOOLTIPS.targetGaps.upperLimit.label}
        value={tooltipValues?.targetGaps?.upperLimit}
      />
      <TooltipComponent
        id={TOOLTIPS.targetGaps.lowerLimit.id}
        label={TOOLTIPS.targetGaps.lowerLimit.label}
        value={tooltipValues?.targetGaps?.lowerLimit}
      />
    </>
  );
};

TooltipsComponent.propTypes = {
  data: PropTypes.object
};

export default TooltipsComponent;
