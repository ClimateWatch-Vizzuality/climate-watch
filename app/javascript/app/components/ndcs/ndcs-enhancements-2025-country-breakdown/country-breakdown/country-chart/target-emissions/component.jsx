/* eslint-disable no-mixed-operators */
import React, { useMemo } from 'react';
import { format } from 'd3-format';

import EmissionsBarComponent from '../components/emissions-bar';

import { CONDITIONAL_OPTIONS } from '../../constants';

const CHANGE_BAR_WIDTH = 18;

const TargetEmissionsComponent = ({ chartConfig = {}, settings }) => {
  const { axis, scales, domains, margins, dimensions, data } = chartConfig;
  const type = settings?.conditionalNDC?.value || 'conditional';

  // Remove the bars that are not part of the scale (i.e. that don't have NDC data for the current view)
  const emissionsData = data?.target?.data?.filter(dataEntry =>
    scales.x.domain().includes(dataEntry.name)
  );

  if (!margins || !dimensions || !scales || !settings || !axis) return null;

  const barsData = useMemo(
    () =>
      emissionsData?.map(dataEntry => {
        const { iso, name } = dataEntry;

        const calculateBarForType = value => {
          if (value < 0) {
            const height = scales.y(value) - scales.y(0);
            return {
              position: { x: scales.x(name), y: scales.y(value) - height },
              height,
              value,
              tooltipId: `country-emissions-${iso}-tooltip`
            };
          }

          return {
            position: { x: scales.x(name), y: scales.y(value) },
            height: scales.y(0) - scales.y(value),
            value,
            tooltipId: `country-emissions-${iso}-tooltip`
          };
        };

        return {
          iso,
          ...CONDITIONAL_OPTIONS?.reduce(
            (optionAcc, optionEntry) => ({
              ...optionAcc,
              [optionEntry]: calculateBarForType(dataEntry[optionEntry])
            }),
            {}
          )
        };
      }),
    [chartConfig, data, settings]
  );

  if (!barsData) return null;

  const offsetToCenterBars = useMemo(
    () =>
      (dimensions.width - margins.left) / (axis?.x?.ticks?.length || 1) / 2 -
      CHANGE_BAR_WIDTH,
    [dimensions, barsData]
  );

  return (
    <>
      {barsData?.map(entry => (
        <g key={entry?.iso} transform={`translate(${offsetToCenterBars},0)`}>
          <EmissionsBarComponent
            key={`${2035}-${entry?.iso}`}
            color={entry?.iso === 'WORLD' ? '#0845CB' : '#83A2E5'}
            type={2035}
            margins={margins}
            dimensions={dimensions}
            scales={scales}
            axis={axis}
            domains={domains}
            position={entry?.[type]?.position}
            size={{
              width: CHANGE_BAR_WIDTH,
              height: entry?.[type]?.height || 0
            }}
            tooltipId={entry?.[type]?.tooltipId}
            value={entry?.[type]?.value}
            isGroupedLocations={entry?.iso === 'OTHERS' || false}
          />
        </g>
      ))}
      {/* Total emissions */}
      <g transform={`translate(0,${dimensions.height - margins.bottom + 20})`}>
        {/* Label */}
        <g transform={`translate(${margins.left - 12},0)`}>
          <text x={0} y={0} dy="1em" fill="currentColor" textAnchor="end">
            Total emissions
          </text>
          <text x={0} y={18} dy="1em" fill="currentColor" textAnchor="end">
            in 2021
          </text>
          <text x={0} y={36} dy="1em" fill="currentColor" textAnchor="end">
            (MtCO2e)
          </text>
        </g>
        {/* Background rect */}
        <rect
          fill="#F1F4FB"
          x={margins.left}
          y={0}
          height={margins.bottom - 20}
          width={dimensions.width - margins.left - margins.right}
        />
        {/* Values */}
        <g
          transform={`translate(${margins.left +
            offsetToCenterBars +
            CHANGE_BAR_WIDTH -
            1},0)`}
        >
          {emissionsData
            ?.filter(({ iso }) => iso !== 'OTHERS')
            .map(({ name, total2021 }) => (
              <text
                x={scales.x(name)}
                y={(margins.bottom - 20) / 2}
                dy="0.5em"
                fill="currentColor"
                textAnchor="middle"
              >
                {format(',.2f')(total2021 || 0)}
              </text>
            ))}
        </g>
      </g>
    </>
  );
};

TargetEmissionsComponent.propTypes = {};

export default TargetEmissionsComponent;
