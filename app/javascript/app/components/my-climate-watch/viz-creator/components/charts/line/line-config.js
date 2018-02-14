import { format } from 'd3-format';
import { assign } from 'app/utils';
import { CHART_COLORS } from 'data/constants';

import { groupBy, pick } from '../utils';

const makeConfig = data => {
  const keys = Object.keys(data[0]).filter(k => k !== 'year');
  const tick = { stroke: '#8f8fa1', strokeWidth: 0.5, fontSize: '13px' };
  const names = pick('name', data); // only data name key
  return {
    chart: {
      data: pick('value', data), // only data value key
      margin: { top: 20, right: 0, left: -10, bottom: 0 }
    },
    columns: {
      x: ['year'],
      y: keys
    },
    xAxis: {
      dataKey: 'year',
      tick,
      padding: { left: 15, right: 20 },
      tickSize: 8
    },
    yAxis: {
      axisLine: false,
      tickFormatter: t => `${format('.2s')(t)}t`,
      tickLine: false,
      tick,
      domain: ['auto', 'auto']
    },
    cartesianGrid: {
      vertical: false
    },
    theme: keys.reduce(
      (th, k, i) =>
        assign(th, {
          [k]: {
            stroke: CHART_COLORS[i],
            type: 'monotone',
            dot: false
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

export const lineChart1Data = (timeSeries, scenarios) =>
  makeConfig(groupBy('scenario', timeSeries, scenarios));

export const lineChart2Data = (timeSeries, locations) =>
  makeConfig(groupBy('location', timeSeries, locations));
