import React from 'react';
import { CHART_COLORS, CHART_COLORS_EXTENDED } from 'data/constants';
import { assign } from 'app/utils';
import { setChartColors } from 'app/utils/graphs';
import { groupByYear, groupBy, pick } from '../utils';

import Tick from '../tick';

const makeConfig = (data, keys, indicators, yAxisLabel, small) => {
  const names = pick('name', data); // only data name key
  const unit = indicators[0] && indicators[0].unit;
  const chartColors = setChartColors(
    keys.length,
    CHART_COLORS,
    CHART_COLORS_EXTENDED
  );
  return {
    chart: {
      data: pick('value', data), // only data value key
      margin: { top: 50, right: 30, left: 45, bottom: 5 },
      yAxisLabel,
      stackOffset: 'sign',
      unit
    },
    columns: {
      x: ['year'],
      y: keys
    },
    xAxis: small
      ? false
      : {
        dataKey: 'year',
        axisLine: false,
        tickLine: false,
        tick: !small
      },
    yAxis: small
      ? false
      : {
        axisLine: false,
        tickLine: false,
        tick: small
          ? false
          : tick => {
            const tickProps = tick;
            delete tickProps.verticalAnchor; // verticalAnchor prop is not supported
            return tick.index % 2 && <Tick {...tickProps} />;
          }
      },
    cartesianGrid: small
      ? false
      : {
        vertical: false
      },
    theme: keys.reduce(
      (th, k, i) =>
        assign(th, {
          [k]: {
            fill: chartColors[i],
            stroke: ''
          }
        }),
      {}
    ),
    tooltip: small ? null : { unit, names },
    legend: keys.map((k, i) => ({
      color: chartColors[i],
      label: names[0][k]
    }))
  };
};

export const stackBarChart1Data = (
  timeSeries,
  indicators,
  yAxisLabel,
  small
) => {
  const data = groupByYear(timeSeries, 'indicator', indicators);
  const keys = Object.keys(data[0]).filter(k => k !== 'year');
  return makeConfig(data, keys, indicators, yAxisLabel, small);
};

export const stackBarChart2Data = (
  timeseries,
  locations,
  indicators,
  yAxisLabel,
  small
) => {
  const data = groupBy(
    timeseries,
    ['location', 'indicator'],
    [locations, indicators]
  );
  const keys = Object.keys(data[0]).filter(k => k !== 'location');
  const baseConfig = makeConfig(data, keys, indicators, yAxisLabel, small);
  return assign(baseConfig, {
    chart: {
      ...baseConfig.chart,
      layout: 'vertical',
      unit: indicators[0].unit,
      margin: { top: 50, right: 30, left: 40, bottom: 5 }
    },
    cartesianGrid: small
      ? false
      : {
        ...baseConfig.cartesianGrid,
        horizontal: false
      },
    xAxis: {
      type: 'number',
      tick: !small
    },
    yAxis: small
      ? false
      : {
        type: 'category',
        dataKey: 'location'
      }
  });
};
