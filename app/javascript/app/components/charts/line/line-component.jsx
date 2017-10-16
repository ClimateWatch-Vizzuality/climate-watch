import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import TooltipChart from 'components/charts/tooltip-chart';
import { format } from 'd3-format';

class ChartLine extends PureComponent {
  render() {
    const { config, data } = this.props;
    return (
      <ResponsiveContainer height={500}>
        <LineChart
          data={data}
          margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
        >
          <XAxis
            dataKey="x"
            tick={{ stroke: '#8f8fa1', strokeWidth: 0.5, fontSize: '13px' }}
          />
          <YAxis
            axisLine={false}
            tickFormatter={tick => `${format('.2s')(tick)}t`}
            tickLine={false}
            tick={{ stroke: '#8f8fa1', strokeWidth: 0.5, fontSize: '13px' }}
            domain={['auto', 'auto']}
          />
          <CartesianGrid vertical={false} />
          <Tooltip
            isAnimationActive={false}
            cursor={{ stroke: '#113750', strokeWidth: 2 }}
            content={content => (
              <TooltipChart content={content} config={config} />
            )}
          />
          {config.columns &&
            config.columns.y.map(column => (
              <Line
                key={column.value}
                dataKey={column.value}
                dot={false}
                stroke={config.theme[column.value].stroke || ''}
                strokeWidth={2}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

ChartLine.propTypes = {
  config: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
};

export default ChartLine;
