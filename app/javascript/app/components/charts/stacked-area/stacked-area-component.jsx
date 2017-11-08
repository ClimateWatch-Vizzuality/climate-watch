import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import max from 'lodash/max';
import isArray from 'lodash/isArray';

import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  ReferenceDot,
  Label,
  ResponsiveContainer
} from 'recharts';
import TooltipChart from 'components/charts/tooltip-chart';
import { format } from 'd3-format';

function includeTotalData(data, config) {
  return data.map(d => {
    let total = null;
    config.columns.y.forEach(key => {
      if (d[key.value]) {
        if (!total) total = 0;
        total += d[key.value];
      }
    });
    return {
      ...d,
      total
    };
  });
}

function getMaxValue(data, config) {
  const lastData = data[data.length - 1];
  const values = config.columns.y.map(key => lastData[key.value]);
  return {
    x: data[data.length - 1].x,
    y: max(values)
  };
}

const tickFormat = { fill: '#8f8fa1', strokeWidth: 0, fontSize: '13px' };

class ChartStackedArea extends PureComponent {
  constructor() {
    super();
    this.state = {
      activePoint: null,
      activeCoordinateX: 0,
      showLastPoint: true
    };
  }

  setLastPoint = showLastPoint => {
    this.setState({ showLastPoint });
  };

  debouncedMouseMove = debounce(year => {
    this.props.onMouseMove(year);
  }, 80);

  handleMouseMove = e => {
    const activeCoordinateX = e && e.activeCoordinate && e.activeCoordinate.x;
    const chartX = (e && e.chartX) || 0;
    const tooltipVisibility = activeCoordinateX >= chartX - 30;
    if (this.state.tooltipVisibility !== tooltipVisibility) {
      this.setState({ tooltipVisibility }, () => this.props.onMouseMove(e));
    }
    const year = e && e.activeLabel;
    if (year) {
      this.debouncedMouseMove(year);
    }
  };

  handlePointeHover(activePoint) {
    this.setState({ activePoint });
  }

  render() {
    const { activePoint, tooltipVisibility, showLastPoint } = this.state;
    const { config, data, height, points, includeTotalLine } = this.props;
    if (!data.length) return null;

    const maxData = getMaxValue(data, config);

    let dataParsed = data;
    if (includeTotalLine) {
      dataParsed = includeTotalData(data, config);
      maxData.y = dataParsed[dataParsed.length - 1].total;
    }

    const domain = {
      x: ['dataMin', 'dataMax'],
      y: ['dataMin', 'dataMax']
    };

    if (points.length > 0) {
      domain.x[1] = max(points.map(p => p.x));
      domain.y[1] =
        max(points.map(p => (isArray(p.y) ? max(p.y) : p.y))) + 1000000;
    }
    return (
      <ResponsiveContainer height={height}>
        <ComposedChart
          data={dataParsed}
          margin={{ top: 45, right: 20, left: -10, bottom: 0 }}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={() => this.setLastPoint(true)}
          onMouseEnter={() => this.setLastPoint(false)}
        >
          <XAxis
            domain={domain.x}
            type="number"
            dataKey="x"
            padding={{ left: 30, right: 40 }}
            tick={tickFormat}
          />
          <YAxis
            type="number"
            domain={domain.y}
            axisLine={false}
            padding={{ top: 0, bottom: 0 }}
            tickFormatter={tick => (tick === 0 ? 0 : `${format('.2s')(tick)}t`)}
            tickLine={false}
            tick={tickFormat}
          />
          <CartesianGrid vertical={false} />
          {tooltipVisibility && (
            <Tooltip
              viewBox={{ x: 0, y: 0, width: 100, height: 100 }}
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
                type="step"
              />
            ))}
          {includeTotalLine && (
            <Line
              key="total"
              dataKey="total"
              dot={false}
              stroke="#113750"
              strokeWidth={2}
              type="step"
            />
          )}
          {showLastPoint && (
            <ReferenceDot
              x={maxData.x}
              y={maxData.y}
              fill="#113750"
              stroke="#fff"
              strokeWidth={2}
              r={6}
            >
              <Label
                value={maxData.x}
                position="top"
                fill="#8f8fa1"
                strokeWidth={0.5}
                fontSize="13px"
                offset={25}
              />
              <Label
                value={`${format('.3s')(maxData.y)}t`}
                position="top"
                fill="#113750"
                fontSize="18px"
              />
            </ReferenceDot>
          )}
          {points.length > 0 &&
            points.map(point => {
              const isActivePoint =
                activePoint &&
                (point.x === activePoint.x && point.y === activePoint.y);
              const yearLabel = isActivePoint ? (
                <Label
                  value={`${point.x} - ${point.label}`}
                  position="top"
                  fill="#8f8fa1"
                  stroke="#fff"
                  strokeWidth={8}
                  style={{ paintOrder: 'stroke' }}
                  fontSize="13px"
                  offset={25}
                  isFront
                />
              ) : null;

              const valueLabelValue = point.isRange
                ? `${format('.3s')(point.y[0])}t - ${format('.3s')(
                  point.y[1]
                )}t`
                : `${format('.3s')(point.y)}t`;
              const valueLabel = isActivePoint ? (
                <Label
                  value={valueLabelValue}
                  position="top"
                  stroke="#fff"
                  strokeWidth={4}
                  style={{ paintOrder: 'stroke' }}
                  fill="#113750"
                  fontSize="18px"
                  isFront
                />
              ) : null;

              if (point.isRange) {
                return [
                  <ReferenceArea
                    key={`${point.label}-${point.x + point.y[0] + point.y[1]}`}
                    x1={point.x - 0.01}
                    x2={point.x + 0.01}
                    y1={point.y[0]}
                    y2={point.y[1]}
                    fill="transparent"
                    fillOpacity={0}
                    stroke="#113750"
                    strokeOpacity={isActivePoint ? 1 : 0.3}
                    strokeWidth={isActivePoint ? 8 : 6}
                    strokeLinejoin="round"
                    onMouseEnter={() => this.handlePointeHover(point)}
                    onMouseLeave={() => this.handlePointeHover(null)}
                  >
                    {yearLabel}
                    {valueLabel}
                  </ReferenceArea>
                ];
              }
              return (
                <ReferenceDot
                  key={`${point.label}-${point.x + point.y}`}
                  x={point.x}
                  y={point.y}
                  fill={'#113750'}
                  fillOpacity={isActivePoint ? 1 : 0.3}
                  r={isActivePoint ? 6 : 4}
                  onMouseEnter={() => this.handlePointeHover(point)}
                  onMouseLeave={() => this.handlePointeHover(null)}
                >
                  {yearLabel}
                  {valueLabel}
                </ReferenceDot>
              );
            })}
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
