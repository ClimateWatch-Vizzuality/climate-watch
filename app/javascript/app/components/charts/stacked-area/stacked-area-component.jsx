import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Dot,
  ResponsiveContainer
} from 'recharts';
import TooltipChart from 'components/charts/tooltip-chart';
import { format } from 'd3-format';

class ChartStackedArea extends PureComponent {
  render() {
    const { config, data, height, onMouseMove, points } = this.props;
    return (
      <ResponsiveContainer height={height}>
        <ComposedChart
          data={data}
          margin={{ top: 0, right: 0, left: -18, bottom: 0 }}
          onMouseMove={onMouseMove}
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
          {points && points.map(point => console.log(point) || (
            <Dot r={15} key={point.cy} cx="x" cy="points" />
          ))
          }
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

ChartStackedArea.propTypes = {
  config: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  points: PropTypes.array.isRequired,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string // % accepted
  ]).isRequired,
  onMouseMove: PropTypes.func.isRequired
};

ChartStackedArea.defaultProps = {
  height: 500,
  onMouseMove: () => {}
};

export default ChartStackedArea;
