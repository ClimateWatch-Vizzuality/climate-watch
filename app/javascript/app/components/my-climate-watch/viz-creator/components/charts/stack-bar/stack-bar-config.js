import React from 'react';
import { CHART_COLORS } from 'data/constants';
import { assign } from 'app/utils';
import { groupBy, pick } from '../utils';

import Tick from '../tick';

const stackBarChart1Data = (timeSeries, indicators) => {
  const data = groupBy('indicator', timeSeries, indicators);
  const keys = Object.keys(data[0]).filter(k => k !== 'year');
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
      tickLine: false
    },
    yAxis: {
      axisLine: false,
      tickLine: false,
      tick: tick => tick.index % 2 && <Tick {...tick} />
    },
    cartesianGrid: {
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

export default stackBarChart1Data;
