import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

const ChartLine = ({
  width,
  height,
  config,
  lines,
  lineProps,
  axis,
  cartesianGrid,
  className
}) => (
  <ResponsiveContainer className={className} width={width} height={height}>
    <LineChart {...config}>
      {cartesianGrid && <CartesianGrid {...cartesianGrid} />}
      {!isEmpty(lines) && lines.map(l => <Line key={l} {...lineProps[l]} />)}
      {axis && axis.x && <XAxis {...axis.x.props || null} />}
      {axis && axis.y && <YAxis {...axis.y.props || null} />}
    </LineChart>
  </ResponsiveContainer>
);

ChartLine.propTypes = {
  className: PropTypes.string,
  width: PropTypes.any.isRequired,
  height: PropTypes.any.isRequired,
  config: PropTypes.PropTypes.shape({
    data: PropTypes.array.isRequired,
    margin: PropTypes.object,
    height: PropTypes.string
  }),
  lines: PropTypes.array.isRequired,
  lineProps: PropTypes.object,
  axis: PropTypes.object,
  cartesianGrid: PropTypes.object
};

ChartLine.defaultProps = {
  width: '100%',
  height: 300
};

export default ChartLine;
