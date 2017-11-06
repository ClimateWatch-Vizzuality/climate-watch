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
  ReferenceDot,
  Label,
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
    const {
      config,
      data,
      height,
      onMouseMove,
      points,
      includeTotalLine
    } = this.props;
    if (!data.length) return null;

    let dataParsed = data;
    if (includeTotalLine) {
      dataParsed = includeTotalData(data, config);
    }

    const domain = {
      x: ['dataMin', 'dataMax'],
      y: ['dataMin', 'dataMax']
    };
    // TODO: remove hack that disables quantifications
    if (points.length > 1000) {
      // dataParsed.push({ x: data[data.length - 1].x + 0.0000000000000001 });
      // dataParsed = dataParsed.concat(points);
      domain.x[1] = points[points.length - 1].x;
      domain.y[1] = points[points.length - 1].y;
    }
    return (
      <ResponsiveContainer height={height}>
        <ComposedChart
          data={dataParsed}
          margin={{ top: 20, right: 20, left: -10, bottom: 0 }}
          onMouseMove={onMouseMove}
        >
          <XAxis
            domain={domain.x}
            type="number"
            dataKey="x"
            tick={{ stroke: '#8f8fa1', strokeWidth: 0.5, fontSize: '13px' }}
          />
          <YAxis
            type="number"
            domain={domain.y}
            axisLine={false}
            tickFormatter={tick => `${format('.2s')(tick)}t`}
            tickLine={false}
            tick={{ stroke: '#8f8fa1', strokeWidth: 0.5, fontSize: '13px' }}
          />
          <CartesianGrid vertical={false} />
          {config.columns && (
            <Tooltip
              viewBox={{ x: 0, y: 0, width: 100, height: 100 }}
              isAnimationActive={false}
              cursor={{ stroke: '#113750', strokeWidth: 2 }}
              content={content =>
                !!points.length &&
                content.label <= points[0].x && (
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
          {points.length > 0 &&
            points.map(point => (
              <ReferenceDot
                key={point.x}
                x={point.x}
                y={point.y}
                fill="#8699A4"
                r={4}
              >
                <Label
                  value={`${format('.3s')(point.y)}t`}
                  position="top"
                  fill="#8f8fa1"
                  strokeWidth={0.5}
                  fontSize="13px"
                />
              </ReferenceDot>
            ))}
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
  onMouseMove: PropTypes.func.isRequired,
  includeTotalLine: PropTypes.bool
};

ChartStackedArea.defaultProps = {
  height: 500,
  onMouseMove: () => {},
  includeTotalLine: true,
  points: []
};

export default ChartStackedArea;
