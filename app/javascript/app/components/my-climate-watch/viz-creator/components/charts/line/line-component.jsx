import React from 'react';
import PropTypes from 'prop-types';

import {
  Label,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

const CustomizedYAxisTick = ({ payload, unit, x, y }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x="0"
      y="0"
      dy="0"
      textAnchor="end"
      stroke="#b1b1c1"
      strokeWidth="0.5"
      fontSize="13px"
    >
      {`${payload.value}${unit ? '' : 't'}`}
    </text>
  </g>
);

CustomizedYAxisTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.object,
  unit: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

const yAxisUnitLabel = unit => (
  <Label
    position="top"
    content={() => (
      <text x="22" y="20">
        {unit}
      </text>
    )}
  />
);

const yAxisIndicatorLabel = (label, height) => (
  <Label
    position="left"
    angle={-90}
    content={() => (
      <text
        x={height * -0.5}
        y="15"
        textAnchor="middle"
        transform="rotate(-90)"
      >
        {label}
      </text>
    )}
  />
);

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
