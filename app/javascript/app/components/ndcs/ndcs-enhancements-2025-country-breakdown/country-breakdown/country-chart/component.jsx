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
// import TooltipsComponent from './tooltips';

const CountryChartComponent = ({
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
          // TODO: How about countries with no 2035 target?
          //       Do they go to the end or do we order by 2020 target?
          const aValue = a?.[conditionalNDC?.value]?.[2035] || 100000;
          const bValue = b?.[conditionalNDC?.value]?.[2035] || 100000;
          return aValue - bValue;
        });

      const sortedCountries = sortEntries(baselineData);
      const countriesToDisplay = sortedCountries.slice(0, 10);
      const otherCountries = sortedCountries.slice(10);

      const otherCountriesEntry = otherCountries?.reduce(
        (ocAcc, ocEntry) => ({
          iso: 'OTHERS',
          name: 'Other Countries',
          conditional: {
            2030:
              ocAcc?.conditional?.[2030] ||
              0 + ocEntry?.conditional?.[2030] ||
              0,
            2035:
              ocAcc?.conditional?.[2035] ||
              0 + ocEntry?.conditional?.[2035] ||
              0
          },
          unconditional: {
            2030:
              ocAcc?.unconditional?.[2030] ||
              0 + ocEntry?.unconditional?.[2030] ||
              0,
            2035:
              ocAcc?.unconditional?.[2035] ||
              0 + ocEntry?.unconditional?.[2035] ||
              0
          }
        }),
        {}
      );

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
                ...TARGET_YEARS?.reduce(
                  (targetAcc, targetEntry) => [
                    ...targetAcc,
                    allValuesEntry?.[typeEntry]?.[targetEntry]
                  ],
                  []
                )
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
          // TODO: How about countries with no 2035 target?
          //       Do they go to the end or do we order by 2020 target?
          const aValue = a?.[conditionalNDC?.value] || 100000;
          const bValue = b?.[conditionalNDC?.value] || 100000;
          return aValue - bValue;
        });

      const sortedCountries = sortEntries(targetData);
      const countriesToDisplay = sortedCountries.slice(0, 10);
      const otherCountries = sortedCountries.slice(10);

      const otherCountriesEntry = otherCountries?.reduce(
        (ocAcc, ocEntry) => ({
          iso: 'OTHERS',
          name: 'Other Countries',
          conditional: ocAcc?.conditional || 0 + ocEntry?.conditional || 0,
          unconditional: ocAcc?.unconditional || 0 + ocEntry?.unconditional || 0
        }),
        {}
      );

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
    [currentViewData]
  );

  const yValues = currentViewData?.yValues;

  // =======================================================
  // DETERMINE CHART DOMAINS AND TICKS BASED ON SORTED DATA
  // =======================================================

  // Min and Max Y values to be used to calculate chart domains as well as axises
  const yMinMax = useMemo(
    () => ({
      min: yValues?.[0],
      max: yValues?.[yValues?.length - 1]
    }),
    [yValues]
  );

  // Calculating rounded y axis tick sizes
  const yTickSize = useMemo(() => {
    const tickCount = 6;
    const range = Math.abs(yMinMax.min) + Math.abs(yMinMax.max);
    const unroundedTickSize = range / (tickCount - 1);
    const pow10x = 10 ** Math.ceil(Math.log10(unroundedTickSize) - 1);
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
      ?.sort((a, b) => a + b);

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
      height: 420
    };

    // Scales
    const yScale = scaleLinear()
      .domain(chartDomains.y)
      .range([
        dimensions?.height -
          (SETTINGS.chartMargins.top + SETTINGS.chartMargins.bottom),
        0
      ]);

    const xScale = scaleBand()
      .domain(chartDomains.x)
      .range([
        0,
        chartContainerWidth -
          (SETTINGS.chartMargins.left + SETTINGS.chartMargins.right)
      ]);

    // Chart config
    setChartConfig({
      chartId: `#iconic-chart-country-${type}`,
      margins: SETTINGS.chartMargins,
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
  }, [type, chartContainerWidth, chartDomains, chartTicks, currentView]);

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
      {/* <TooltipsComponent data={parsedData} settings={settings} /> */}
    </div>
  );
};

CountryChartComponent.propTypes = {
  type: PropTypes.oneOf(['chart', 'png-download']),
  data: PropTypes.array,
  settings: PropTypes.object
};

export default CountryChartComponent;
