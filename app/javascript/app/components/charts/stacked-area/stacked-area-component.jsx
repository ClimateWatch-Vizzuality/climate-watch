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
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { config, data } = this.props;
    return (
      <ResponsiveContainer height={500}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis
            dataKey="x"
            tick={{
              marginTop: '10px',
              fontSize: '16px',
              stroke: '#8f8fa1',
              strokeWidth: 1
            }}
          />
          <YAxis axisLine={false} tickFormatter={tick => format('.1s')(tick)} />
          <CartesianGrid vertical={false} />
          <Tooltip
            isAnimationActive={false}
            cursor={{ stroke: 'white', strokeWidth: 1 }}
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
