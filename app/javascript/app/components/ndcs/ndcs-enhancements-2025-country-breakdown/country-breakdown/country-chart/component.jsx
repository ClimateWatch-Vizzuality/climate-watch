/* eslint-disable no-mixed-operators */
import React, { useRef, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear, scaleBand } from 'd3-scale';

import AxisGridComponent from './axis-grid/component';

import {
  SETTINGS,
  TARGET_YEARS,
  CHART_COMPONENTS,
  CHART_AXES
} from '../constants';
import styles from './styles';
import TooltipsComponent from './tooltips';

const CountryChartComponent = ({
  id,
  type = 'chart',
  data = [],
  settings = {}
}) => {
  const chartContainer = useRef();
  const [chartConfig, setChartConfig] = useState(undefined);
  const [chartContainerWidth, setChartContainerWidth] = useState(undefined);

  const { conditionalNDC, view } = settings;
  const currentView = view?.value;

  // ==================================
  // CONTAINER SIZING BASED ON THE VIEW
  // ==================================

  useEffect(() => {
    const onResize = () => {
      setChartContainerWidth(
        chartContainer?.current?.getBoundingClientRect()?.width
      );
    };

    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ========================================
  // PARSE DATA FOR DISPLAY BASED ON SETTINGS
  // ========================================

  const parsedData = useMemo(() => {
    // Baseline Year Comparison
    const parseBaselineData = () => {
      const baselineData = data?.baseline || [];

      const sortEntries = entries =>
        entries?.sort((a, b) => {
          const aValue =
            a?.[conditionalNDC?.value]?.[2035]?.percentage || 100000;
          const bValue =
            b?.[conditionalNDC?.value]?.[2035]?.percentage || 100000;
          return aValue - bValue;
        });

      const sortedCountries = sortEntries(baselineData);
      const countriesToDisplay = sortedCountries.slice(0, 10);
      const otherCountries = sortedCountries.slice(10);

      const otherCountriesEntry = otherCountries?.reduce((ocAcc, ocEntry) => {
        const isFalsy = value => value === null || value === undefined;
        return {
          iso: 'OTHERS',
          name: 'Other Countries',
          latest_ndc: [...(ocAcc?.latest_ndc || []), ocEntry?.latest_ndc],
          conditional: {
            2030: {
              value:
                isFalsy(ocAcc?.conditional?.[2030]?.value) &&
                isFalsy(ocEntry?.conditional?.[2030]?.value)
                  ? null
                  : (ocAcc?.conditional?.[2030]?.value || 0) +
                    (ocEntry?.conditional?.[2030]?.value || 0)
            },
            2035: {
              value:
                isFalsy(ocAcc?.conditional?.[2035]?.value) &&
                isFalsy(ocEntry?.conditional?.[2035]?.value)
                  ? null
                  : (ocAcc?.conditional?.[2035]?.value || 0) +
                    (ocEntry?.conditional?.[2035]?.value || 0)
            }
          },
          unconditional: {
            2030: {
              value:
                isFalsy(ocAcc?.unconditional?.[2030]?.value) &&
                isFalsy(ocEntry?.unconditional?.[2030]?.value)
                  ? null
                  : (ocAcc?.unconditional?.[2030]?.value || 0) +
                    (ocEntry?.unconditional?.[2030]?.value || 0)
            },
            2035: {
              value:
                isFalsy(ocAcc?.unconditional?.[2035]?.value) &&
                isFalsy(ocEntry?.unconditional?.[2035]?.value)
                  ? null
                  : (ocAcc?.unconditional?.[2035]?.value || 0) +
                    (ocEntry?.unconditional?.[2035]?.value || 0)
            }
          }
        };
      }, {});

      if (
        otherCountriesEntry.conditional &&
        otherCountriesEntry.unconditional
      ) {
        const historicalConditional = otherCountries
          // We only take into account the 2030 value as requested by WRI
          .filter(
            entry =>
              entry.conditional[2030]?.value !== null &&
              entry.conditional[2030]?.value !== undefined
          )
          .map(entry => entry.historical)
          .reduce((res, value) => res + (value || 0), 0);

        const historicalUnconditional = otherCountries
          // We only take into account the 2030 value as requested by WRI
          .filter(
            entry =>
              entry.unconditional[2030]?.value !== null &&
              entry.unconditional[2030]?.value !== undefined
          )
          .map(entry => entry.historical)
          .reduce((res, value) => res + (value || 0), 0);

        otherCountriesEntry.conditional[2030].percentage =
          ((otherCountriesEntry.conditional[2030].value || 0) /
            historicalConditional) *
          -1 *
          100;
        otherCountriesEntry.conditional[2035].percentage =
          ((otherCountriesEntry.conditional[2035].value || 0) /
            historicalConditional) *
          -1 *
          100;
        otherCountriesEntry.unconditional[2030].percentage =
          ((otherCountriesEntry.unconditional[2030].value || 0) /
            historicalUnconditional) *
          -1 *
          100;
        otherCountriesEntry.unconditional[2035].percentage =
          ((otherCountriesEntry.unconditional[2035].value || 0) /
            historicalUnconditional) *
          -1 *
          100;
      }

      const sortedData = sortEntries(
        [
          ...countriesToDisplay,
          !!Object.values(otherCountriesEntry)?.length && otherCountriesEntry
        ]?.filter(entry => !!entry)
      );

      const yValues = sortedData
        ?.reduce(
          (allValuesAcc, allValuesEntry) => [
            ...allValuesAcc,
            ...[settings?.conditionalNDC?.value]?.reduce(
              (typeAcc, typeEntry) => [
                ...typeAcc,
                ...TARGET_YEARS?.reduce((targetAcc, targetEntry) => {
                  // Ignore the values for countries which are not displayed in the chart
                  if (
                    allValuesEntry?.latest_ndc === 'no_ndc' ||
                    allValuesEntry?.latest_ndc === 'no_new_ndc'
                  ) {
                    return targetAcc;
                  }

                  return [
                    ...targetAcc,
                    allValuesEntry?.[typeEntry]?.[targetEntry]?.percentage
                  ];
                }, [])
              ],
              []
            )
          ],
          []
        )
        ?.filter(entry => !!entry)
        ?.sort((a, b) => a - b);

      return {
        data: sortedData,
        yValues
      };
    };

    // 2030-2035 Target Comparison
    const parseTargetData = () => {
      const targetData = data?.target || [];

      const sortEntries = entries =>
        entries?.sort((a, b) => {
          const aValue = a?.[conditionalNDC?.value] || 100000;
          const bValue = b?.[conditionalNDC?.value] || 100000;
          return aValue - bValue;
        });

      const worldEntry = targetData.find(({ iso }) => iso === 'WORLD') || {
        iso: 'WORLD',
        conditional: 0,
        unconditional: 0,
        latest_ndc: [],
        total2022: 0
      };
      const nonWorldEntries = targetData.filter(({ iso }) => iso !== 'WORLD');
      const sortedNonWorldEntries = sortEntries(nonWorldEntries);

      const top9NonWorldEntries = sortedNonWorldEntries.slice(0, 9);
      const otherNonWorldEntries = sortedNonWorldEntries.slice(9);

      const otherCountriesEntry = otherNonWorldEntries?.reduce(
        (ocAcc, ocEntry) => ({
          iso: 'OTHERS',
          name: 'Other Countries',
          conditional:
            (ocAcc?.conditional === null || ocAcc?.conditional === undefined) &&
            (ocEntry?.conditional === null ||
              ocEntry?.conditional === undefined)
              ? null
              : (ocAcc?.conditional || 0) + (ocEntry?.conditional || 0),
          unconditional:
            (ocAcc?.unconditional === null ||
              ocAcc?.unconditional === undefined) &&
            (ocEntry?.unconditional === null ||
              ocEntry?.unconditional === undefined)
              ? null
              : (ocAcc?.unconditional || 0) + (ocEntry?.unconditional || 0),
          latest_ndc: [...(ocAcc?.latest_ndc || []), ocEntry?.latest_ndc],
          total2022: (ocAcc?.total_2022 || 0) + (ocEntry?.total_2022 || 0)
        }),
        {}
      );

      const sortedData = [
        {
          ...worldEntry,
          name: 'Global Total'
        },
        ...sortEntries(
          [
            ...top9NonWorldEntries,
            !!Object.values(otherCountriesEntry)?.length && otherCountriesEntry
          ]?.filter(entry => !!entry)
        )
      ];

      const yValues = sortedData
        ?.reduce(
          (allValuesAcc, allValuesEntry) => [
            ...allValuesAcc,
            allValuesEntry?.[conditionalNDC?.value]
          ],
          []
        )
        ?.filter(entry => !!entry)
        ?.sort((a, b) => a - b);

      return {
        data: sortedData,
        yValues
      };
    };

    return {
      baseline: parseBaselineData(),
      target: parseTargetData()
    };
  }, [data, settings]);

  // ===================================================
  // ISOS AND Y VALUES BASED ON SETTINGS AND PARSED DATA
  // ===================================================

  const currentViewData = parsedData?.[currentView];

  const sortedNames = useMemo(
    () => currentViewData?.data?.map(({ name }) => name),
    [currentView, currentViewData]
  );

  const yValues = currentViewData?.yValues;

  // =======================================================
  // DETERMINE CHART DOMAINS AND TICKS BASED ON SORTED DATA
  // =======================================================

  // Min and Max Y values to be used to calculate chart domains as well as axes
  const yMinMax = useMemo(
    () => ({
      min: yValues?.[0] || 0,
      max: yValues?.[yValues?.length - 1] || 0
    }),
    [yValues]
  );

  // Calculating rounded y axis tick sizes
  const yTickSize = useMemo(() => {
    const tickCount = 6;
    const range = Math.abs(yMinMax.min) + Math.abs(yMinMax.max);
    const unroundedTickSize = range / (tickCount - 1);
    const pow10x =
      unroundedTickSize === 0
        ? 1
        : 10 ** Math.ceil(Math.log10(unroundedTickSize) - 1);
    return Math.ceil(unroundedTickSize / pow10x) * pow10x;
  }, [yMinMax]);

  // Calculating ticks array, pos and neg (including 0 if both are present) dynamically
  const yTicksArr = useMemo(() => {
    const posTicksArr = Array.from({
      length: yMinMax.max > 0 ? Math.floor(yMinMax.max / yTickSize) + 1 : 0
    })
      ?.map((_, i) => (i + 1) * yTickSize)
      ?.sort((a, b) => a - b);

    const negTicksArr = Array.from({
      length:
        yMinMax.min < 0 ? Math.floor(Math.abs(yMinMax.min) / yTickSize) + 1 : 0
    })
      ?.map((_, i) => (i + 1) * -yTickSize)
      ?.sort((a, b) => a - b);

    return [...(yMinMax.min >= 0 ? [] : negTicksArr), 0, ...posTicksArr];
  }, [yMinMax, yTickSize]);

  // Domains
  const chartDomains = useMemo(() => {
    // Calculate X Domain
    const xDomain = sortedNames;

    // Calculate Y Domain
    const yDisplayOffset = yTickSize / 2;
    const yMinTick = yTicksArr?.[0];
    const yMaxTick = yTicksArr?.[yTicksArr?.length - 1];
    const yDomain = [yMinTick - yDisplayOffset, yMaxTick + yDisplayOffset];

    return { x: xDomain, y: yDomain };
  }, [sortedNames, yTicksArr]);

  // Ticks
  const chartTicks = useMemo(() => {
    const xTicks = sortedNames || [];
    const yTicks = yTicksArr;

    return { x: xTicks, y: yTicks };
  }, [sortedNames, yTicksArr]);

  // =====================================
  // SETTING CHART CONFIGURATION AND DATA
  // =====================================

  useEffect(() => {
    // Chart dimensions
    const dimensions = {
      width: chartContainerWidth,
      height: 450
    };

    const margins = {
      ...SETTINGS.chartMargins,
      bottom: currentView === 'target' ? SETTINGS.chartMargins.bottom : 0
    };

    // Scales
    const yScale = scaleLinear()
      .domain(chartDomains.y)
      .range([
        dimensions?.height - (margins.top + margins.bottom),
        20 // These 20px add some space between the countries at the top of the chart itself
      ]);

    const xScale = scaleBand()
      .domain(chartDomains.x)
      .range([0, chartContainerWidth - (margins.left + margins.right)]);

    // Chart config
    setChartConfig({
      chartId: `#iconic-chart-country-${type}-${id}`,
      margins,
      dimensions: dimensions?.width && dimensions,
      domains: chartDomains?.x && chartDomains?.y && chartDomains,
      axis: {
        x: { ticks: chartTicks.x },
        y: { ticks: chartTicks.y, ...CHART_AXES[currentView] }
      },
      scales: {
        x: xScale,
        y: yScale
      },
      data: parsedData
    });
  }, [id, type, chartContainerWidth, chartDomains, chartTicks, currentView]);

  const chartReady = !!chartConfig && !!chartConfig?.dimensions;
  const ChartComponent = CHART_COMPONENTS[currentView];

  // =====================================
  // RENDER
  // =====================================

  return (
    <div ref={chartContainer} className={styles.chartContainerCountry}>
      <svg
        id={`${chartConfig?.chartId?.substring(1)}`}
        width={chartContainerWidth}
        height={chartConfig?.dimensions?.height}
      >
        {chartReady && (
          <>
            <AxisGridComponent chartConfig={chartConfig} />
            <ChartComponent chartConfig={chartConfig} settings={settings} />
          </>
        )}
      </svg>
      <TooltipsComponent
        data={chartConfig?.data}
        view={currentView}
        settings={settings}
      />
    </div>
  );
};

CountryChartComponent.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['chart', 'png-download']),
  data: PropTypes.array,
  settings: PropTypes.object
};

export default CountryChartComponent;
