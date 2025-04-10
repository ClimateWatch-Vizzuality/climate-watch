/* eslint-disable no-mixed-operators */
import React, { useMemo } from 'react';

import EmissionsBarComponent from '../components/emissions-bar';
import { TARGET_YEARS, CONDITIONAL_OPTIONS } from '../../constants';
import MessagesComponent from '../components/messages';

const CHANGE_BAR_WIDTH = 18;

const BaselineEmissionsComponent = ({ chartConfig = {}, settings }) => {
  const { axis, scales, domains, margins, dimensions, data } = chartConfig;
  const type = settings?.conditionalNDC?.value || 'conditional';
  const emissionsData = data?.baseline?.data;

  if (!margins || !dimensions || !scales || !settings || !axis) return null;

  const barsData = useMemo(
    () =>
      emissionsData?.reduce((dataAcc, dataEntry) => {
        const { iso, name, latest_ndc } = dataEntry;

        const calculateBarForType = value => {
          if (value < 0) {
            const height = scales.y(value) - scales.y(0);
            return {
              position: { x: scales.x(name), y: scales.y(value) - height },
              height,
              value,
              latest_ndc
            };
          }

          return {
            position: { x: scales.x(name), y: scales.y(value) },
            height: scales.y(0) - scales.y(value),
            value,
            latest_ndc
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
                      tooltipId: `country-emissions-${iso}-${year}-tooltip`,
                      ...calculateBarForType(
                        dataEntry?.[type]?.[year]?.percentage
                      )
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
      {barsData?.map(entry => {
        const latestNDCByYear =
          TARGET_YEARS?.map(year => entry?.[year]?.[type]?.latest_ndc) || [];
        const valueByYear =
          TARGET_YEARS?.map(year => entry?.[year]?.[type]?.value) || [];

        // The country's latest_ndc is no_ndc or the aggregated “Other Countries” only represents countries with no_ndc
        if (latestNDCByYear.flat().every(item => item === 'no_ndc')) {
          return (
            <g
              key={entry?.iso}
              transform={`translate(${offsetToCenterBars},0)`}
            >
              <MessagesComponent
                messages={['No NDC']}
                margins={margins}
                dimensions={dimensions}
                scales={scales}
                position={entry?.[TARGET_YEARS[0]]?.[type]?.position}
                size={{
                  width: CHANGE_BAR_WIDTH,
                  height: 0
                }}
              />
            </g>
          );
        }

        // The country's latest_ndc is no_new_ndc or the aggregated “Other Countries” only represents countries with
        // no_ndc or no_new_ndc
        if (
          latestNDCByYear
            .flat()
            .every(item => item === 'no_ndc' || item === 'no_new_ndc')
        ) {
          return (
            <g
              key={entry?.iso}
              transform={`translate(${offsetToCenterBars},0)`}
            >
              <MessagesComponent
                messages={['No New NDC']}
                margins={margins}
                dimensions={dimensions}
                scales={scales}
                position={entry?.[TARGET_YEARS[0]]?.[type]?.position}
                size={{
                  width: CHANGE_BAR_WIDTH,
                  height: 0
                }}
              />
            </g>
          );
        }

        // The country doesn't have any value for any of the target years or the aggregated “Other Countries” represents
        // at least some countries with new_ndc but without any value for any of the target years
        if (valueByYear.every(value => value === undefined || value === null)) {
          return (
            <g
              key={entry?.iso}
              transform={`translate(${offsetToCenterBars},0)`}
            >
              <MessagesComponent
                messages={[
                  'No',
                  type === 'conditional' ? 'Conditional' : 'Unconditional',
                  'Targets'
                ]}
                margins={margins}
                dimensions={dimensions}
                scales={scales}
                position={entry?.[TARGET_YEARS[0]]?.[type]?.position}
                size={{
                  width: CHANGE_BAR_WIDTH,
                  height: 0
                }}
              />
            </g>
          );
        }

        // The country is missing some values for some target years or the aggregated “Other Countries” represents at
        // least some countries with new_ndc for which some values are missing for some target years
        const messages = [];
        if (valueByYear.some(value => value === undefined || value === null)) {
          valueByYear.forEach((value, index) => {
            if (value === undefined || value === null) {
              const year = TARGET_YEARS[index];
              messages.push(
                ...[
                  `No ${year}`,
                  type === 'conditional' ? 'Conditional' : 'Unconditional',
                  'Target'
                ]
              );
            }
          });
        }

        return (
          <g key={entry?.iso} transform={`translate(${offsetToCenterBars},0)`}>
            {messages.length > 0 && (
              <MessagesComponent
                messages={messages}
                margins={margins}
                dimensions={dimensions}
                scales={scales}
                position={entry?.[TARGET_YEARS[0]]?.[type]?.position}
                size={{
                  width: CHANGE_BAR_WIDTH,
                  height: 0
                }}
              />
            )}
            {TARGET_YEARS?.map(year => (
              <EmissionsBarComponent
                key={`${year}-${entry?.iso}`}
                color={year === 2030 ? '#CCCDCF' : '#83A2E5'}
                year={year}
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
        );
      })}
    </>
  );
};

BaselineEmissionsComponent.propTypes = {};

export default BaselineEmissionsComponent;
