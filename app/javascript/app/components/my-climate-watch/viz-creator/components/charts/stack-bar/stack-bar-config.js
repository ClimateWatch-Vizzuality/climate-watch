import React from 'react';
import { CHART_COLORS } from 'data/constants';
import { assign } from 'app/utils';
import { groupByYear, groupBy, pick } from '../utils';

import Tick from '../tick';

const makeConfig = (data, keys, indicators, yAxisLabel, small) => {
  const names = pick('name', data); // only data name key
  return {
    chart: {
      data: pick('value', data), // only data value key
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    },
    columns: {
      x: ['year'],
      y: keys
    },
    xAxis: {
      dataKey: 'year',
      axisLine: false,
      tickLine: false,
      tick: !small
    },
    yAxis: {
      axisLine: false,
      tickLine: false,
      tick: small ? false : tick => tick.index % 2 && <Tick {...tick} />,
      label: yAxisLabel,
      unit: indicators[0] && indicators[0].unit
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
            fill: CHART_COLORS[i],
            stroke: ''
          }
        }),
      {}
    ),
    legend: keys.map((k, i) => ({
      color: CHART_COLORS[i],
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
      layout: 'vertical'
    },
    cartesianGrid: small
      ? false
      : {
        ...baseConfig.cartesianGrid,
        horizontal: false
      },
    xAxis: {
      type: 'number',
      hide: true,
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
