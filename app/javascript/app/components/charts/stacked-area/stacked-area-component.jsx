import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { getCustomTicks } from 'utils/graphs';
import { isMicrosoftBrowser, wordWrap } from 'utils';
import { isPageContained } from 'utils/navigation';
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
import { formatSIwithDecimals } from 'utils/d3-custom-format';

import { QUANTIFICATION_COLORS, QUANTIFICATIONS_CONFIG } from 'data/constants';
import DividerLine from './divider-line';

const NUMBER_PRECISION = '2';

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

  formatValue(value) {
    const { formatValue, unit } = this.props;
    if (!formatValue) {
      return formatSIwithDecimals(value, NUMBER_PRECISION, unit);
    }
    return formatValue(value);
  }

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

  renderQuantificationPoints() {
    const { points, dataMaxMin } = this.props;
    const { activePoint } = this.state;
    const isEdgeOrExplorer = isMicrosoftBrowser();

    const getColorPoint = point => {
      switch (true) {
        case point.y === null:
          return QUANTIFICATION_COLORS.NOT_QUANTIFIABLE;
        case point.label.includes('BAU'):
          return QUANTIFICATION_COLORS.BAU;
        case point.label.includes(QUANTIFICATIONS_CONFIG.net_zero.label):
          return QUANTIFICATION_COLORS.NET_ZERO;
        default:
          return QUANTIFICATION_COLORS.QUANTIFIED;
      }
    };

    return (
      points &&
      points.length > 0 &&
      points.map(point => {
        const isActivePoint =
          activePoint && point.x === activePoint.x && point.y === activePoint.y;
        const colorPoint = getColorPoint(point);
        // LABELS
        // yearLabel
        const LENGHT_LIMIT = 15;
        const isLongLabel = point.label.length > LENGHT_LIMIT;
        const yearLabel = (
          <Label
            value={`${point.x}${isLongLabel ? '' : ` - ${point.label}`}`}
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
        const MAX_LINE_LENGHT = 15;
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
        const extraLabel = wordWrap(point.label, MAX_LINE_LENGHT).map((l, i) =>
          extraLabelLine(l, LABEL_OFFSET + i * DY)
        );

        // value label
        const valueLabelValue = point.isRange
          ? `${this.formatValue(point.y[0])} - ${this.formatValue(point.y[1])}`
          : `${this.formatValue(point.y)}`;
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

        // RANGES AND POINTS
        const isNotQuantifiable = point.y === null;
        if (point.isRange || isNotQuantifiable) {
          const key = `${point.label}-${
            point.y ? point.x + point.y[0] + point.y[1] : point.x
          }`;
          return (
            <ReferenceArea
              key={key}
              x1={point.x - 0.01}
              x2={point.x + 0.01}
              y1={isNotQuantifiable ? dataMaxMin.min : point.y[0]}
              y2={isNotQuantifiable ? dataMaxMin.max : point.y[1]}
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
      })
    );
  }

  renderLastPoint() {
    const { lastData } = this.props;
    const isEdgeOrExplorer = isMicrosoftBrowser();
    return (
      <ReferenceDot
        x={lastData.x}
        y={lastData.y}
        fill="#113750"
        stroke="#fff"
        strokeWidth={2}
        r={6}
      >
        <Label
          value={lastData.x}
          position="top"
          fill="#8f8fa1"
          fontSize="13px"
          offset={25}
          stroke="#fff"
          strokeWidth={isEdgeOrExplorer ? 0 : 8}
          style={{ paintOrder: 'stroke' }}
        />
        <Label
          value={`${this.formatValue(lastData.y)}`}
          position="top"
          fill="#113750"
          fontSize="18px"
          stroke="#fff"
          strokeWidth={isEdgeOrExplorer ? 0 : 8}
          style={{ paintOrder: 'stroke' }}
        />
      </ReferenceDot>
    );
  }

  render() {
    const { tooltipVisibility, showLastPoint } = this.state;
    const {
      config,
      dataWithTotal,
      ghgChart,
      height,
      points,
      includeTotalLine,
      highlightLastPoint,
      domain,
      stepped,
      lastData,
      padding,
      unit,
      yTickFormatter,
      tooltipConfig
    } = this.props;
    if (!dataWithTotal.length) return null;
    const tickColumns = {
      x: config.columns.x,
      y: config.columns.y.concat({ value: 'y' })
    };
    const tickValues = getCustomTicks(
      tickColumns,
      dataWithTotal.concat(points),
      5
    );
    return (
      <ResponsiveContainer height={height}>
        <ComposedChart
          data={dataWithTotal}
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
            padding={{ left: padding.left, right: padding.right }}
            tick={<CustomXAxisTick customstrokeWidth="0" />}
            tickSize={8}
            allowDecimals={false}
            tickCount={dataWithTotal.length + points.length}
          />
          <YAxis
            type="number"
            domain={domain.y}
            interval={0}
            axisLine={false}
            padding={{ top: padding.top, bottom: padding.bottom }}
            tickLine={false}
            tick={
              <CustomYAxisTick
                customstrokeWidth="0"
                unit={unit === false ? '' : unit}
                tickFormatter={yTickFormatter}
              />
            }
            ticks={tickValues.ticks}
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
                <TooltipChart
                  content={content}
                  config={config}
                  customFormatFunction={value => this.formatValue(value)}
                  {...tooltipConfig}
                />
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
                type={stepped ? 'step' : 'linear'}
              />
            ))}
          {includeTotalLine && (
            <Line
              key="total"
              dataKey="total"
              dot={false}
              stroke="#113750"
              strokeWidth={2}
              type={stepped ? 'step' : 'linear'}
            />
          )}
          {!isPageContained && ghgChart && DividerLine({ x: lastData.x })}
          {highlightLastPoint && showLastPoint && this.renderLastPoint()}
          {ghgChart && this.renderQuantificationPoints()}
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

ChartStackedArea.propTypes = {
  config: PropTypes.object.isRequired,
  dataWithTotal: PropTypes.array.isRequired,
  points: PropTypes.array,
  domain: PropTypes.object,
  dataMaxMin: PropTypes.object,
  yTickFormatter: PropTypes.func,
  lastData: PropTypes.object,
  unit: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string // % accepted
  ]).isRequired,
  padding: PropTypes.object,
  onMouseMove: PropTypes.func.isRequired,
  includeTotalLine: PropTypes.bool.isRequired,
  highlightLastPoint: PropTypes.bool.isRequired,
  ghgChart: PropTypes.bool.isRequired,
  stepped: PropTypes.bool.isRequired,
  formatValue: PropTypes.func,
  tooltipConfig: PropTypes.shape({
    showTotal: PropTypes.bool,
    sortByValue: PropTypes.bool
  })
};

ChartStackedArea.defaultProps = {
  height: 500,
  padding: {
    top: 0,
    bottom: 0,
    left: 30,
    right: 40
  },
  onMouseMove: () => {},
  includeTotalLine: true,
  highlightLastPoint: true,
  ghgChart: true,
  stepped: false,
  unit: 't',
  points: [],
  tooltipConfig: {
    showTotal: true,
    sortByValue: true
  }
};

export default ChartStackedArea;
