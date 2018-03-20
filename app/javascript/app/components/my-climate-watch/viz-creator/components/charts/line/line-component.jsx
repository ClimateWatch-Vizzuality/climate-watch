import React from 'react';
import PropTypes from 'prop-types';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

import CustomTooltip from '../tooltip';

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
      <Tooltip
        cursor={{ stroke: '#113750', strokeWidth: 2 }}
        content={<CustomTooltip active {...config} />}
      />
    </LineChart>
  </ResponsiveContainer>
);

ChartLine.defaultProps = {
  width: '100%',
  height: '300px'
};

ChartLine.propTypes = {
  className: PropTypes.string,
  width: PropTypes.any,
  height: PropTypes.any,
  chart: PropTypes.PropTypes.object,
  config: PropTypes.object
};

export default ChartLine;
