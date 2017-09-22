import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import TooltipChart from 'components/charts/tooltip-chart';
import { format } from 'd3-format';

class ChartStackedArea extends PureComponent {
  render() {
    const { config, data } = this.props;
    return (
      <ResponsiveContainer height={500}>
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: -40, bottom: 0 }}
        >
          <XAxis
            dataKey="x"
            tick={{ stroke: '#8f8fa1', strokeWidth: 0.5, fontSize: '13px' }}
          />
          <YAxis
            axisLine={false}
            tickFormatter={tick => format('.1s')(tick)}
            tickLine={false}
            tick={{ stroke: '#8f8fa1', strokeWidth: 0.5, fontSize: '13px' }}
          />
          <CartesianGrid vertical={false} />
          <Tooltip
            isAnimationActive={false}
            cursor={{ stroke: '#113750', strokeWidth: 2 }}
            content={content => (
              <TooltipChart content={content} config={config} />
            )}
          />
          {config.columns.y.map(column => (
            <Area
              key={column}
              type="monotone"
              dataKey={column}
              stackId="1"
              stroke={config.theme[column].stroke || ''}
              fill={config.theme[column].fill || ''}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

ChartStackedArea.propTypes = {
  config: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
};

export default ChartStackedArea;
