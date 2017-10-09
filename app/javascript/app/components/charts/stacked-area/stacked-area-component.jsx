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
    const { config, data, height } = this.props;
    return (
      <ResponsiveContainer height={height}>
        <AreaChart
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
          />
          <CartesianGrid vertical={false} />
          {config.columns && (
            <Tooltip
              isAnimationActive={false}
              cursor={{ stroke: '#113750', strokeWidth: 2 }}
              content={content => (
                <TooltipChart content={content} config={config} />
              )}
            />
          )}
          {config.columns &&
            config.columns.y.map(column => (
              <Area
                key={column.value}
                dataKey={column.value}
                dot={false}
                stackId={1}
                stroke={'transparent' || ''}
                strokeWidth={0}
                fill={config.theme[column.value].fill || ''}
              />
            ))}
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

ChartStackedArea.propTypes = {
  config: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string // % accepted
  ]).isRequired
};

ChartStackedArea.defaultProps = {
  height: 500
};

export default ChartStackedArea;
