import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import min from 'lodash/min';
import max from 'lodash/max';
import isArray from 'lodash/isArray';
import { getCustomTicks } from 'utils/graphs';
import { isMicrosoftBrowser, wordWrap } from 'utils';
import {
  CustomXAxisTick,
  CustomYAxisTick
} from 'components/axis-ticks/axis-ticks-component';
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
  ReferenceLine,
  Label,
  ResponsiveContainer
} from 'recharts';
import TooltipChart from 'components/charts/tooltip-chart';
import { format } from 'd3-format';

import { QUANTIFICATION_COLORS } from 'data/constants';

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
    const isEdgeOrExplorer = isMicrosoftBrowser();

    let dataParsed = data;
    if (includeTotalLine) {
      dataParsed = includeTotalData(data, config);
      maxData.y = dataParsed[dataParsed.length - 1].total;
    }

    const tickValues = getCustomTicks(config.columns, data);
    const domain = {
      x: ['dataMin', 'dataMax'],
      y: ['auto', 'auto']
    };

    if (points && points.length > 0) {
      domain.x[1] = max(points.map(p => p.x)) + 1;
      domain.y[0] = min(points.map(p => (isArray(p.y) ? min(p.y) : p.y)));
      domain.y[1] = max(points.map(p => (isArray(p.y) ? max(p.y) : p.y)));
    }

    return (
      <ResponsiveContainer height={height}>
        <ComposedChart
          data={dataParsed}
          margin={{ top: 45, right: 20, left: -10, bottom: 0 }}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={() => this.setLastPoint(true)}
          onMouseEnter={() => this.setLastPoint(false)}
          stackOffset="sign"
        >
          <XAxis
            domain={domain.x}
            type="number"
            dataKey="x"
            padding={{ left: 30, right: 40 }}
            tick={<CustomXAxisTick customstrokeWidth="0" />}
            tickSize={8}
            allowDecimals={false}
            tickCount={data.length + points.length}
          />
          <YAxis
            type="number"
            domain={domain.y}
            interval={0}
            axisLine={false}
            padding={{ top: 0, bottom: 0 }}
            tickLine={false}
            tick={<CustomYAxisTick customstrokeWidth="0" unit="t" />}
          />
          <CartesianGrid vertical={false} />
          {tickValues.min < 0 && (
            <ReferenceLine y={0} strokeWidth="2" stroke="#666" fill="" />
          )}
          {tooltipVisibility && (
            <Tooltip
              viewBox={{ x: 0, y: 0, width: 100, height: 100 }}
              isAnimationActive={false}
              cursor={{ stroke: '#113750', strokeWidth: 2 }}
              content={content => (
                <TooltipChart content={content} config={config} showTotal />
              )}
              filterNull={false}
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
                fontSize="13px"
                offset={25}
                stroke="#fff"
                strokeWidth={isEdgeOrExplorer ? 0 : 8}
                style={{ paintOrder: 'stroke' }}
              />
              <Label
                value={`${format('.3s')(maxData.y)}t`}
                position="top"
                fill="#113750"
                fontSize="18px"
                stroke="#fff"
                strokeWidth={isEdgeOrExplorer ? 0 : 8}
                style={{ paintOrder: 'stroke' }}
              />
            </ReferenceDot>
          )}
          {points &&
            points.length > 0 &&
            points.map(point => {
              const isActivePoint =
                activePoint &&
                (point.x === activePoint.x && point.y === activePoint.y);
              let colorPoint =
                point.label.includes('BAU') && point.y > 0
                  ? QUANTIFICATION_COLORS.BAU
                  : QUANTIFICATION_COLORS.QUANTIFIED;
              if (point.y === null) {
                colorPoint = QUANTIFICATION_COLORS.NOT_QUANTIFIABLE;
              }

              // yearLabel
              const LENGHT_LIMIT = 30;
              const isLongLabel = point.label.length > LENGHT_LIMIT;
              const yearLabel = (
                <Label
                  value={`${point.x}${isLongLabel ? '' : `- ${point.label}`}`}
                  position="top"
                  fill="#8f8fa1"
                  stroke="#fff"
                  strokeWidth={isEdgeOrExplorer ? 0 : 8}
                  style={{ paintOrder: 'stroke' }}
                  fontSize="13px"
                  offset={25}
                />
              );

              // extraLabelLine - For long labels
              const MAX_LINE_LENGHT = 20;
              const LABEL_OFFSET = 10;
              const DY = 20;
              const extraLabelLine = (text, offset) => (
                <Label
                  key={text}
                  value={text}
                  position="insideTop"
                  fill="#8f8fa1"
                  stroke="#fff"
                  strokeWidth={isEdgeOrExplorer ? 0 : 8}
                  style={{ paintOrder: 'stroke', zIndex: 500 }}
                  fontSize="13px"
                  offset={offset}
                />
              );
              const extraLabel = wordWrap(
                point.label,
                MAX_LINE_LENGHT
              ).map((l, i) => extraLabelLine(l, LABEL_OFFSET + i * DY));

              // value label
              const valueLabelValue = point.isRange
                ? `${format('.3s')(point.y[0])}t - ${format('.3s')(
                  point.y[1]
                )}t`
                : `${format('.3s')(point.y)}t`;
              const valueLabel = (
                <Label
                  value={valueLabelValue}
                  position="top"
                  stroke="#fff"
                  strokeWidth={isEdgeOrExplorer ? 0 : 4}
                  style={{ paintOrder: 'stroke' }}
                  fill="#113750"
                  fontSize="18px"
                />
              );

              if (point.isRange || point.y === null) {
                return (
                  <ReferenceArea
                    key={`${point.label}-${point.y &&
                      point.x + point.y[0] + point.y[1]}`}
                    x1={point.x - 0.01}
                    x2={point.x + 0.01}
                    y1={point.y ? point.y[0] : 0}
                    y2={point.y ? point.y[1] : maxData.y}
                    fill="transparent"
                    fillOpacity={0}
                    stroke={colorPoint}
                    strokeOpacity={0.65}
                    strokeWidth={isActivePoint ? 10 : 8}
                    strokeLinejoin="round"
                    onMouseEnter={() => this.handlePointeHover(point)}
                    onMouseLeave={() => this.handlePointeHover(null)}
                  >
                    {isActivePoint ? yearLabel : null}
                    {isActivePoint && isLongLabel ? extraLabel : null}
                    {isActivePoint && point.y ? valueLabel : null}
                  </ReferenceArea>
                );
              } else if (point.x && point.y !== null) {
                return (
                  <ReferenceDot
                    key={`${point.label}-${point.x + point.y}`}
                    x={point.x}
                    y={point.y}
                    fill={colorPoint}
                    fillOpacity={0.65}
                    stroke="#fff"
                    strokeWidth={2}
                    r={isActivePoint ? 8 : 6}
                    onMouseEnter={() => this.handlePointeHover(point)}
                    onMouseLeave={() => this.handlePointeHover(null)}
                  >
                    {isActivePoint ? yearLabel : null}
                    {isActivePoint && isLongLabel ? extraLabel : null}
                    {isActivePoint ? valueLabel : null}
                  </ReferenceDot>
                );
              }
              return null;
            })}
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

ChartStackedArea.propTypes = {
  config: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  points: PropTypes.array,
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
