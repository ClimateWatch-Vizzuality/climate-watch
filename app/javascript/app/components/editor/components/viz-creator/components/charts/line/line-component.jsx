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

const ChartLine = ({ config, lines, lineProps, axis, cartesianGrid }) => (
  <ResponsiveContainer width="80%" height={300}>
    <LineChart {...config}>
      {cartesianGrid && <CartesianGrid {...cartesianGrid} />}
      {lines && lines.map(l => (
        <Line key={l} {...lineProps[l]} />
      ))}
      {axis.x && <XAxis {...axis.x.props || null} />}
      {axis.y && <YAxis {...axis.y.props || null} />}
    </LineChart>
  </ResponsiveContainer>
);

ChartLine.propTypes = {
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
  config: {
    height: '100%'
  }
};

export default ChartLine;
