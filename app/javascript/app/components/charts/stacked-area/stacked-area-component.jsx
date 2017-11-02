import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import TooltipChart from 'components/charts/tooltip-chart';
import { format } from 'd3-format';

function includeTotalData(data, config) {
  return data.map(d => {
    let total = 0;
    config.columns.y.forEach(key => {
      total += d[key.value];
    });
    return {
      ...d,
      total
    };
  });
}

class ChartStackedArea extends PureComponent {
  render() {
    const { config, data, height, onMouseMove, includeTotalLine } = this.props;
    if (!data.length) return null;

    let dataParsed = data;
    if (includeTotalLine) {
      dataParsed = includeTotalData(data, config);
    }
    return (
      <ResponsiveContainer height={height}>
        <ComposedChart
          data={dataParsed}
          margin={{ top: 20, right: 20, left: -10, bottom: 0 }}
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
                <TooltipChart content={content} config={config} showTotal />
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
          {includeTotalLine && (
            <Line
              key="total"
              dataKey="total"
              dot={false}
              stroke="#113750"
              strokeWidth={2}
            />
          )}
        </ComposedChart>
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
  ]).isRequired,
  onMouseMove: PropTypes.func.isRequired,
  includeTotalLine: PropTypes.bool
};

ChartStackedArea.defaultProps = {
  height: 500,
  onMouseMove: () => {},
  includeTotalLine: true
};

export default ChartStackedArea;
