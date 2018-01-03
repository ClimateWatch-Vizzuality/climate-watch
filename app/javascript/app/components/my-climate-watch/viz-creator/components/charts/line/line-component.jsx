import React from 'react';
import PropTypes from 'prop-types';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  // Tooltip,
  ResponsiveContainer
} from 'recharts';
// import TooltipChart from 'components/charts/tooltip-chart';

const ChartLine = ({
  width,
  height,
  config,
  lines,
  lineProps,
  axis,
  cartesianGrid
}) => (
  <ResponsiveContainer width={width} height={height}>
    <LineChart {...config}>
      {cartesianGrid && <CartesianGrid {...cartesianGrid} />}
      {lines && lines.map(l => <Line key={l} {...lineProps[l]} />)}
      {axis.x && <XAxis {...axis.x.props || null} />}
      {axis.y && <YAxis {...axis.y.props || null} />}
    </LineChart>
  </ResponsiveContainer>
);

ChartLine.propTypes = {
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
