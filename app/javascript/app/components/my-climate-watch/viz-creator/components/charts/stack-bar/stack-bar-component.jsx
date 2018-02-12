import React from 'react';
import { assign } from 'utils';

import { BarChart, Bar, XAxis } from 'recharts';
import { CHART_COLORS } from 'data/constants';

const StackedBarChart = ({ data, ...props }) => {
  const keys = Object.keys(data[0]).filter(k => k !== 'year');
  const config = {
    chart: {
      width: 600,
      height: 300,
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    },
    xAxis: { dataKey: 'year' },
    columns: {
      x: ['year'],
      y: keys
    },
    theme: keys.reduce((th, k, i) =>
      assign(th, {
        [k]: {
          fill: CHART_COLORS[i + 1],
          stroke: ''
        }
      }), {})
  };
  return (
    <BarChart
      {...config.chart}
    >
      {config.xAxis && <XAxis {...config.xAxis} /> }
      {config.yAxis && <XAxis {...config.yAxis} /> }
      {config.columns.y.map(y =>
        <Bar dataKey={y} key={y} {...config.theme[y]} stackId="a" />
      )}
    </BarChart>
  );
};

export default StackedBarChart;
