/* eslint-disable no-mixed-operators */
import React, { useRef, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';

import AxisGridComponent from './axis-grid';
import HistoricalDataComponent from './historical-data';
import ProjectedDataComponent from './projected-data';
import TargetsComponent from './targets';
import ReductionsComponent from './reductions';
import TargetGapsComponent from './target-gaps';
import TooltipsComponent from './tooltips';

import styles from './styles.scss';

import { SETTINGS } from '../constants';

const GlobalChartComponent = ({ type = 'chart', data }) => {
  const chartContainer = useRef();
  const [chartContainerWidth, setChartContainerWidth] = useState(undefined);
  const [chartConfig, setChartConfig] = useState(undefined);

  const {
    historical: historicalData,
    projected: projectedData,
    targets: targetsData,
    reductions: reductionsData,
    targetGaps: targetGapsData
  } = data || {};

  useEffect(() => {
    const onResize = () => {
      setChartContainerWidth(
        Math.max(
          chartContainer?.current?.getBoundingClientRect()?.width,
          // Minimum width necessary to display the chart correctly
          960
        )
      );
    };

    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Calculating chart domains and ticks to display on the axes, based on the data
  const chartDomains = useMemo(() => {
    const xDomain = [SETTINGS.chartMinYear, SETTINGS.chartMaxYear + 13];

    // Figure out all possible Y values displayed in the chart so we can properly
    // create a domain for D3 to display. Knowing the historical + projection data values
    // and taking into account the values for the "remaining gap" bars we can figure out
    // min and max values from here.
    const allYValues = [
      ...(historicalData?.map(({ y }) => y) || []),
      ...(projectedData?.map(({ y }) => y) || []),
      ...(Object.values(targetsData || {})?.reduce(
        (acc, cur) => [
          ...acc,
          ...Object.values(cur || {})?.reduce(
            (acc2, cur2) => [...acc2, cur2],
            []
          )
        ],
        []
      ) || [])
    ].sort();

    // Min and max values to build our Y domain for D3. We'll add some padding
    // so that the bars don't display with the edges on the SVG edges.
    const yDomain = [
      10, // Should be allYValues[0] - 10, but we're capping it for display purposes
      allYValues[allYValues?.length - 1] + 7
    ];

    return {
      x: xDomain,
      y: yDomain
    };
  }, [historicalData, projectedData]);

  const chartTicks = useMemo(() => {
    // We're displaying years in 5 year increments, we can base the ticks
    // on whether the number is divisible by 5 (2010, 2015, etc)
    const xTicks = Array.from(
      {
        length: SETTINGS.chartMaxYear - SETTINGS.chartMinYear + 1
      },
      (_, k) => k + SETTINGS.chartMinYear
    ).filter(val => val % 5 === 0);

    // We're displaying emissions in 10 year increments, we can base the ticks
    // on whether the number is divisible by 5 (20gt, 30Gt, etc)
    const yTicks = Array.from(
      {
        length: chartDomains?.y?.[1] + 1 - chartDomains?.y?.[0]
      },
      (_, k) => k + chartDomains?.y?.[0]
    ).filter(val => val % 10 === 0);

    return {
      x: xTicks,
      y: yTicks
    };
  }, [historicalData, chartDomains]);

  useEffect(() => {
    // Chart dimensions
    const dimensions = {
      width: chartContainerWidth,
      height: 540
    };

    // Scales
    const yScale = scaleLinear()
      .domain(chartDomains.y)
      .range([
        dimensions?.height -
          (SETTINGS.chartMargins.top + SETTINGS.chartMargins.bottom),
        0
      ]);

    const xScale = scaleLinear()
      .domain(chartDomains.x)
      .range([
        0,
        chartContainerWidth -
          (SETTINGS.chartMargins.left + SETTINGS.chartMargins.right)
      ]);

    // Chart config
    setChartConfig({
      chartId: `#iconic-chart-global-${type}`,
      margins: SETTINGS.chartMargins,
      dimensions: dimensions?.width && dimensions,
      domains: chartDomains?.x && chartDomains?.y && chartDomains,
      axis: {
        x: { ticks: chartTicks.x },
        y: { ticks: chartTicks.y }
      },
      scales: {
        x: xScale,
        y: yScale
      },
      data
    });
  }, [
    type,
    chartContainerWidth,
    historicalData,
    projectedData,
    reductionsData,
    targetsData,
    targetGapsData
  ]);

  const chartReady = !!chartConfig && !!chartConfig?.dimensions;

  return (
    <div className={styles.chartContainer}>
      <div ref={chartContainer} className={styles.chartContainerGlobal}>
        <svg
          id={`${chartConfig?.chartId?.substring(1)}`}
          width={chartContainerWidth}
          height={chartConfig?.dimensions?.height}
        >
          {chartReady && (
            <>
              <AxisGridComponent chartConfig={chartConfig} />
              <HistoricalDataComponent chartConfig={chartConfig} />
              <ProjectedDataComponent chartConfig={chartConfig} />
              <TargetsComponent chartConfig={chartConfig} />
              <ReductionsComponent chartConfig={chartConfig} />
              <TargetGapsComponent chartConfig={chartConfig} />
            </>
          )}
        </svg>
        <TooltipsComponent data={data} />
      </div>
    </div>
  );
};

GlobalChartComponent.propTypes = {
  type: 'chart' || 'png-download',
  data: PropTypes.shape({
    historical: PropTypes.array,
    projected: PropTypes.array,
    targets: PropTypes.object,
    reductions: PropTypes.object,
    targetGaps: PropTypes.object
  })
};

export default GlobalChartComponent;
