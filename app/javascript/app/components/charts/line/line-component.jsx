import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label
} from 'recharts';
import TooltipChart from 'components/charts/tooltip-chart';
import { format } from 'd3-format';
import debounce from 'lodash/debounce';
import isUndefined from 'lodash/isUndefined';

const CustomizedXAxisTick = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x="15"
      y="0"
      dy="16"
      textAnchor="end"
      stroke="#b1b1c1"
      strokeWidth="0.5"
      fontSize="13px"
    >
      {payload.value}
    </text>
  </g>
);

const CustomizedYAxisTick = ({ index, x, y, payload, unit }) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x="0"
      y="0"
      dy="0"
      textAnchor="end"
      stroke="#b1b1c1"
      strokeWidth="0.5"
      fontSize="13px"
    >
      {index === 0 && payload.value >= 0 ? (
        '0'
      ) : (
        `${format(unit ? '.2r' : '.2s')(payload.value)}${unit ? '' : 't'}`
      )}
    </text>
  </g>
);

class ChartLine extends PureComponent {
  debouncedMouseMove = debounce(year => {
    this.props.onMouseMove(year);
  }, 80);

  handleMouseMove = e => {
    const year = e && e.activeLabel;
    if (year) {
      this.debouncedMouseMove(year);
    }
  };

  render() {
    const { config, data, height, domain, espGraph } = this.props;
    const unit =
      config && config.axes && config.axes.yLeft && config.axes.yLeft.unit
        ? config.axes.yLeft.unit
        : null;
    const yAxisLabel = (
      <Label
        position="top"
        offset={20}
        content={() => (
          <text x="8" y="20">
            {unit}
          </text>
        )}
      />
    );
    return (
      <ResponsiveContainer height={height}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 0, left: -10, bottom: 0 }}
          onMouseMove={this.handleMouseMove}
        >
          <XAxis
            dataKey="x"
            scale="linear"
            type="number"
            tick={<CustomizedXAxisTick />}
            domain={domain || ['0', 'auto']}
            padding={{ left: 15, right: 20 }}
            tickSize={8}
            interval="preserveStartEnd"
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={<CustomizedYAxisTick unit={espGraph && unit} />}
            domain={domain || ['0', 'auto']}
          >
            {espGraph && yAxisLabel}
          </YAxis>

          <CartesianGrid vertical={false} />
          <Tooltip
            isAnimationActive={false}
            cursor={{ stroke: '#113750', strokeWidth: 2 }}
            content={content => (
              <TooltipChart content={content} config={config} />
            )}
          />
          {config.columns &&
            config.columns.y.map(column => {
              const color = config.theme[column.value].stroke || '';
              return (
                <Line
                  key={column.value}
                  isAnimationActive={
                    isUndefined(config.animation) ? true : config.animation
                  }
                  dot={{ strokeWidth: 0, fill: color, radius: 0.5 }}
                  dataKey={column.value}
                  stroke={color}
                  strokeWidth={2}
                />
              );
            })}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

CustomizedXAxisTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.object
};

CustomizedYAxisTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  index: PropTypes.number,
  payload: PropTypes.object,
  unit: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

ChartLine.propTypes = {
  config: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  height: PropTypes.any.isRequired,
  onMouseMove: PropTypes.func.isRequired,
  domain: PropTypes.array,
  espGraph: PropTypes.bool.isRequired
};

ChartLine.defaultProps = {
  height: '100%',
  onMouseMove: () => {},
  espGraph: false
};

export default ChartLine;
