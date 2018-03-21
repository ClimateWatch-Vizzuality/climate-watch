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

import {
  yAxisIndicatorLabel,
  yAxisUnitLabel,
  CustomizedYAxisTick
} from '../labels';

const ChartLine = ({ width, height, className, config }) => (
  <ResponsiveContainer className={className} width={width} height={height}>
    <LineChart {...config.chart}>
      {config.cartesianGrid && <CartesianGrid {...config.cartesianGrid} />}
      {config.columns &&
        config.columns.y.map(y => (
          <Line dataKey={y} key={y} {...config.theme[y]} />
        ))}
      {config.xAxis && <XAxis {...config.xAxis} />}
      {config.yAxis && (
        <YAxis tick={<CustomizedYAxisTick unit={config.yAxis.unit} />}>
          {yAxisUnitLabel(config.yAxis.unit)}
          {yAxisIndicatorLabel(config.yAxis.label, height)}
        </YAxis>
      )}
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
