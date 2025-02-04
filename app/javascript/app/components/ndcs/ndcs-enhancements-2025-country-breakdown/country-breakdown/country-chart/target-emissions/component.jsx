/* eslint-disable no-mixed-operators */
import React, { useMemo } from 'react';
// import PropTypes from 'prop-types';

import EmissionsBarComponent from '../components/emissions-bar';

import { CONDITIONAL_OPTIONS } from '../../constants';

const CHANGE_BAR_WIDTH = 18;

const TargetEmissionsComponent = ({ chartConfig = {}, settings }) => {
  const { axis, scales, domains, margins, dimensions, data } = chartConfig;
  const type = settings?.conditionalNDC?.value || 'conditional';
  const emissionsData = data?.target?.data;

  if (!margins || !dimensions || !scales || !settings || !axis) return null;

  const barsData = useMemo(
    () =>
      emissionsData?.reduce((dataAcc, dataEntry) => {
        const { iso } = dataEntry;

        const calculateBarForType = (value) => {
          if (value < 0) {
            const height = scales.y(value) - scales.y(0);
            return {
              position: { x: scales.x(iso), y: scales.y(value) - height },
              height,
              value
            };
          }

          return {
            position: { x: scales.x(iso), y: scales.y(value) },
            height: scales.y(0) - scales.y(value),
            value
          };
        };

        return [
          ...dataAcc,
          {
            iso,
            ...CONDITIONAL_OPTIONS?.reduce((optionAcc, optionEntry) => ({
              ...optionAcc,
              [optionEntry]: calculateBarForType(dataEntry[optionEntry])
            }), {})
          }
        ];
      }, []),
    [chartConfig, data, settings]
  );

  if (!barsData) return null;

  const offsetToCenterBars = useMemo(
    () =>
      dimensions.width / (axis?.x?.ticks?.length || 1) / 2 -
      CHANGE_BAR_WIDTH -
      4,
    [dimensions, barsData]
  );

  return (
    <>
      {barsData?.map((entry) => (
        <g key={entry?.iso} transform={`translate(${offsetToCenterBars},0)`}>(
        <EmissionsBarComponent
          key={`${2035}-${entry?.iso}`}
          type={2035}
          margins={margins}
          dimensions={dimensions}
          scales={scales}
          axis={axis}
          domains={domains}
          position={entry?.[type]?.position}
          size={{
            width: CHANGE_BAR_WIDTH,
            height: entry?.[type]?.height
          }}
          tooltipId={entry?.[type]?.tooltipId}
          value={entry?.[type]?.value}
        />
        </g>
      ))}
    </>
  );
};

TargetEmissionsComponent.propTypes = {};

export default TargetEmissionsComponent;
