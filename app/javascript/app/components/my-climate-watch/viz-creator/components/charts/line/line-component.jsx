import React from 'react';
import PropTypes from 'prop-types';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

const ChartLine = ({ width, height, className, config }) => (
  <ResponsiveContainer className={className} width={width} height={height}>
    <LineChart {...config.chart}>
      {config.cartesianGrid && <CartesianGrid {...config.cartesianGrid} />}
      {config.columns &&
        config.columns.y.map(y => (
          <Line dataKey={y} key={y} {...config.theme[y]} />
        ))}
      {config.xAxis && <XAxis {...config.xAxis} />}
      {config.yAxis && <YAxis {...config.yAxis} />}
    </LineChart>
  </ResponsiveContainer>
);

ChartLine.propTypes = {
  className: PropTypes.string,
  width: PropTypes.any.isRequired,
  height: PropTypes.any.isRequired,
  chart: PropTypes.PropTypes.object,
  config: PropTypes.object
};

export default ChartLine;
