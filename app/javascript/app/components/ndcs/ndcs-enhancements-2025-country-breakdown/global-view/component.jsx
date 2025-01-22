/* eslint-disable no-mixed-operators */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { Switch } from 'cw-components';

import ButtonGroup from 'components/button-group';

import styles from './styles.scss';
import AxisGridComponent from './axis-grid';
import HistoricalDataComponent from './historical-data';
import ProjectedDataComponent from './projected-data';
import TargetsComponent from './targets';
import ReductionsComponent from './reductions';
import TargetGapsComponent from './target-gaps';
import TagsComponent from './tags';

import { SETTINGS, CONDITIONAL_SWITCH_OPTIONS, TAGS_DATA } from './constants';

const GlobalViewComponent = ({ data }) => {
  const chartContainer = useRef();
  const [chartContainerWidth, setChartContainerWidth] = useState(undefined);
  const [chartConfig, setChartConfig] = useState(undefined);
  const [conditionalNDC, setConditionalNDC] = useState(
    CONDITIONAL_SWITCH_OPTIONS[0]
  );

  const {
    historicalEmissions,
    projectedEmissions,
    policies,
    ndcs,
    targets: targetsData
  } = data;

  // Calculating historical and projection chart data for display
  const historicalChartData = useMemo(
    () =>
      historicalEmissions
        ?.filter(({ year }) => year >= SETTINGS.chartMinYear)
        ?.map(({ year, value }) => ({
          x: year,
          y: value
        })),
    [historicalEmissions]
  );

  const projectionChartData = useMemo(
    () =>
      projectedEmissions?.map(({ year, value }) => ({
        x: year,
        y: value
      })),
    [historicalEmissions]
  );

  // Calculating reductions data for display on the 2030 and 2035 bars
  const reductionsData = useMemo(
    () => ({
      2030: {
        target: policies?.['2030'],
        actual: ndcs?.['2030']?.unconditional?.['2020']
      },
      2035: {
        target: ndcs?.['2030']?.unconditional?.['2020'],
        actual: ndcs?.['2035']?.[conditionalNDC?.value]?.['2025']
      }
    }),
    [ndcs, policies, conditionalNDC]
  );

  // Calculating target gaps data for bar display
  const targetGapsData = useMemo(
    () => ({
      upperLimit: {
        target: ndcs?.['2035']?.[conditionalNDC?.value]?.['2025'],
        actual: targetsData?.['2035']?.['2.0C']
      },
      lowerLimit: {
        target: ndcs?.['2035']?.[conditionalNDC?.value]?.['2025'],
        actual: targetsData?.['2035']?.['1.5C']
      }
    }),
    [conditionalNDC, ndcs, targetsData]
  );

  // Calculating chart domains and ticks to display on the axises, based on the data
  const chartDomains = useMemo(() => {
    const xDomain = [
      SETTINGS.chartMinYear,
      SETTINGS.chartMaxYear + 13
    ];

    // Figure out all possible Y values displayed in the chart so we can properly
    // create a domain for D3 to display. Knowing the historical + projection data values
    // and taking into account the values for the "remaining gap" bars we can figure out
    // min and max values from here.
    const allYValues = [
      ...(historicalChartData?.map(({ y }) => y) || []),
      ...(projectionChartData?.map(({ y }) => y) || []),
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
    const yDomain = [allYValues[0] - 10, allYValues[allYValues?.length - 1] + 5];

    return {
      x: xDomain,
      y: yDomain
    };
  }, [historicalChartData, projectionChartData]);

  const chartTicks = useMemo(() => {
    // We're displaying years in 5 year increments, we can base the ticks
    // on whether the number is divisible by 5 (2010, 2015, etc)
    const xTicks = Array.from(
      { length: SETTINGS.chartMaxYear - SETTINGS.chartMinYear + 1 },
      (_, k) => k + SETTINGS.chartMinYear
    ).filter((val) => val % 5 === 0);

    // We're displaying emissions in 10 year increments, we can base the ticks
    // on whether the number is divisible by 5 (20gt, 30Gt, etc)
    const yTicks = Array.from(
      { length: chartDomains?.y?.[1] + 1 - chartDomains?.y?.[0] },
      (_, k) => k + chartDomains?.y?.[0]
    ).filter((val) => val % 10 === 0);

    return {
      x: xTicks,
      y: yTicks
    };
  }, [historicalChartData, chartDomains]);

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

  useEffect(() => {
    // Chart dimensions
    const dimensions = {
      width: chartContainerWidth,
      height: 480
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
      chartId: '#iconic-chart-global',
      margins: SETTINGS.chartMargins,
      dimensions: dimensions?.width && dimensions,
      options: {
        conditionalNdc: conditionalNDC?.value === 'conditional'
      },
      axis: {
        x: { ticks: chartTicks.x },
        y: { ticks: chartTicks.y }
      },
      scales: {
        x: xScale,
        y: yScale
      },
      data: {
        historical: historicalChartData,
        projected: projectionChartData,
        targets: targetsData,
        reductions: reductionsData,
        targetGaps: targetGapsData
      }
    });
  }, [
    chartContainerWidth,
    historicalChartData,
    projectionChartData,
    reductionsData,
    targetsData
  ]);

  const chartReady =
    !!chartContainerWidth && !!chartConfig && !!chartConfig?.dimensions;

  return (
    <div className={styles.wrapper}>
      <div className={styles.summaryHeader}>
        <div className={styles.summaryDescription}>
          <p>
            Historical emissions and projections of NDCs targets and global GHG
            Emissions.
          </p>
        </div>
        <div className={styles.buttonGroupContainer}>
          <ButtonGroup
            className={styles.buttonGroup}
            buttonsConfig={[
              {
                type: 'info',
                onClick: () => {}
              },
              {
                type: 'share',
                shareUrl: null
              },
              {
                type: 'download',
                options: [
                  {
                    label: 'Save as image (PNG)',
                    action: () => {}
                  }
                ]
              }
            ]}
          />
        </div>
      </div>

      <div className={styles.chartOptionsContainer}>
        <Switch
          options={CONDITIONAL_SWITCH_OPTIONS}
          selectedOption={conditionalNDC.value}
          onClick={setConditionalNDC}
          theme={{
            wrapper: styles.switchWrapper,
            checkedOption: styles.switchSelected
          }}
        />
      </div>

      <div className={styles.chartContainer}>
        <div ref={chartContainer} className={styles.chartContainerGlobal}>
          {chartReady && (
            <svg
              id="iconic-chart-global"
              width={chartContainerWidth}
              height={chartConfig?.dimensions?.height}
            >
              <AxisGridComponent chartConfig={chartConfig} />
              <HistoricalDataComponent chartConfig={chartConfig} />
              <ProjectedDataComponent chartConfig={chartConfig} />
              <TargetsComponent chartConfig={chartConfig} />
              <ReductionsComponent chartConfig={chartConfig} />
              <TargetGapsComponent chartConfig={chartConfig} />
            </svg>
          )}
        </div>
      </div>
      <div className={styles.tagsAndFooterContainer}>
        <TagsComponent tags={TAGS_DATA} />
        <div className={styles.lastUpdated}>Last updated on June 12,2024</div>
      </div>
    </div>
  );
};

GlobalViewComponent.propTypes = {
  data: PropTypes.shape({
    historicalEmissions: PropTypes.object.isRequired,
    projectedEmissions: PropTypes.object.isRequired,
    targets: PropTypes.object.isRequired,
    policies: PropTypes.object.isRequired,
    ndcs: PropTypes.object.isRequired
  }).isRequired
};

export default GlobalViewComponent;
