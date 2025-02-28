/* eslint-disable no-mixed-operators */
import React, { useMemo } from 'react';
// import PropTypes from 'prop-types';

import EmissionsBarComponent from '../components/emissions-bar';
import { TARGET_YEARS, CONDITIONAL_OPTIONS } from '../../constants';

const CHANGE_BAR_WIDTH = 18;

const BaselineEmissionsComponent = ({ chartConfig = {}, settings }) => {
  const { axis, scales, domains, margins, dimensions, data } = chartConfig;
  const type = settings?.conditionalNDC?.value || 'conditional';
  const emissionsData = data?.baseline?.data;

  if (!margins || !dimensions || !scales || !settings || !axis) return null;

  const barsData = useMemo(
    () =>
      emissionsData?.reduce((dataAcc, dataEntry) => {
        const { iso, name } = dataEntry;

        const calculateBarForType = value => {
          if (value < 0) {
            const height = scales.y(value) - scales.y(0);
            return {
              position: { x: scales.x(name), y: scales.y(value) - height },
              height,
              value
            };
          }

          return {
            position: { x: scales.x(name), y: scales.y(value) },
            height: scales.y(0) - scales.y(value),
            value
          };
        };

        return [
          ...dataAcc,
          {
            iso,
            ...TARGET_YEARS?.reduce(
              (yearsAcc, year) => ({
                ...yearsAcc,
                [year]: CONDITIONAL_OPTIONS?.reduce(
                  targetTypesAcc => ({
                    ...targetTypesAcc,
                    [type]: {
                      tooltipId: `country-emissions-${iso}-${year}-${type}-${settings?.baselineYear?.value}-tooltip`,
                      ...calculateBarForType(dataEntry?.[type]?.[year])
                    }
                  }),
                  {}
                )
              }),
              {}
            )
          }
        ];
      }, []),
    [chartConfig, data, settings]
  );

  if (!barsData) return null;

  const offsetToCenterBars = useMemo(
    () =>
      dimensions.width / (axis?.x?.ticks?.length || 1) / 2 -
      CHANGE_BAR_WIDTH / 2 -
      4,
    [dimensions, barsData]
  );

  return (
    <>
      {barsData?.map(entry => (
        <g key={entry?.iso} transform={`translate(${offsetToCenterBars},0)`}>
          {TARGET_YEARS?.map(year => (
            <EmissionsBarComponent
              key={`${year}-${entry?.iso}`}
              type={year}
              margins={margins}
              dimensions={dimensions}
              scales={scales}
              axis={axis}
              domains={domains}
              position={entry?.[year]?.[type]?.position}
              size={{
                width: CHANGE_BAR_WIDTH,
                height: entry?.[year]?.[type]?.height
              }}
              tooltipId={entry?.[year]?.[type]?.tooltipId}
              value={entry?.[year]?.[type]?.value}
            />
          ))}
        </g>
      ))}
    </>
  );
};

BaselineEmissionsComponent.propTypes = {};

export default BaselineEmissionsComponent;
