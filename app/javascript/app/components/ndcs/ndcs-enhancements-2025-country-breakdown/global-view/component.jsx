import React, { useState, useEffect, useRef } from 'react';
import { Switch } from 'cw-components';

import { scaleLinear } from 'd3-scale';

import ButtonGroup from 'components/button-group';

import styles from './styles.scss';
import AxisGridComponent from './axis-grid';
import HistoricalDataComponent from './historical-data';
import ProjectedDataComponent from './projected-data';
import TargetsComponent from './targets';
import ReductionsComponent from './reductions';
import TargetGapsComponent from './target-gaps';
import TagsComponent from './tags';

const conditionalSwitchOptions = [
  {
    name: 'Unconditional NDC',
    value: 'unconditional'
  },
  {
    name: 'Conditional NDC',
    value: 'conditional'
  }
];

const DEMO_DATA_HISTORICAL = [
  { x: 2014, y: 43 },
  { x: 2015, y: 42 },
  { x: 2016, y: 44 },
  { x: 2017, y: 48 },
  { x: 2018, y: 48 },
  { x: 2019, y: 46 },
  { x: 2020, y: 45 },
  { x: 2021, y: 48 }
];

const DEMO_DATA_PROJECTION = [
  { x: 2021, y: 48 },
  { x: 2030, y: 52 }
];

const TAGS_DATA = [
  {
    label: 'Historical Emissions',
    color: 'gray'
  },
  {
    label: 'Business As Usual Projection',
    color: 'gray'
  },
  {
    label: '2025 NDC Emissions Reduction',
    color: 'blue'
  }
];

const TARGETS_DATA = {
  2030: {
    '2.0C': 38,
    '1.5C': 31
  },
  2035: {
    '2.0C': 34,
    '1.5C': 24
  }
};

const GlobalViewComponent = () => {
  const chartContainer = useRef();
  const [chartConfig, setChartConfig] = useState({});
  const [conditionalNDC, setConditionalNDC] = useState(
    conditionalSwitchOptions[0]
  );

  const historicalData = DEMO_DATA_HISTORICAL;
  const projectedData = DEMO_DATA_PROJECTION;

  const chartDimensions = {
    width: 780,
    height: 480
  };

  const chartMargins = {
    top: 20,
    right: 20,
    bottom: 40,
    left: 40
  };

  useEffect(() => {
    // Scales
    const yScale = scaleLinear()
      .domain([20, 55])
      .range([
        chartDimensions.height - (chartMargins.top + chartMargins.bottom),
        0
      ]);

    const xScale = scaleLinear()
      .domain([2014, 2035])
      .range([
        0,
        chartDimensions.width - (chartMargins.left + chartMargins.right)
      ]);

    // Chart config
    setChartConfig({
      chartId: '#iconic-chart-global',
      margins: chartMargins,
      dimensions: chartDimensions,
      scales: {
        x: xScale,
        y: yScale
      },
      data: {
        historical: historicalData,
        projected: projectedData,
        targets: TARGETS_DATA,
        reductions: {
          2030: {
            actual: 44.5,
            target: projectedData[projectedData.length - 1]?.y
          },
          2035: {
            actual: 42,
            target: 44.5
          }
        },
        targetGaps: {
          upperLimit: {
            actual: TARGETS_DATA['2035']['2.0C'],
            target: 42
          },
          lowerLimit: {
            actual: TARGETS_DATA['2035']['1.5C'],
            target: 42
          }
        }
      }
    });
  }, []);

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
          options={conditionalSwitchOptions}
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
          <svg
            id="iconic-chart-global"
            width={chartDimensions.width}
            height={chartDimensions.height}
          >
            <AxisGridComponent chartConfig={chartConfig} />
            <HistoricalDataComponent chartConfig={chartConfig} />
            <ProjectedDataComponent chartConfig={chartConfig} />
            <TargetsComponent chartConfig={chartConfig} />
            <ReductionsComponent chartConfig={chartConfig} />
            <TargetGapsComponent chartConfig={chartConfig} />
          </svg>
        </div>
      </div>
      <TagsComponent tags={TAGS_DATA} />
      <div className={styles.lastUpdated}>Last updated on June 12,2024</div>
    </div>
  );
};

GlobalViewComponent.PropTypes = {};

export default GlobalViewComponent;
