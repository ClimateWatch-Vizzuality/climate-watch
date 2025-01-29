/* eslint-disable no-mixed-operators */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { line } from 'd3-shape';
import { format } from 'd3-format';

import RectComponent from '../rect';
import PolygonComponent from '../polygon';
import TextComponent from '../text';
import CircleComponent from '../circle';
import LineComponent from '../line';

const CHANGE_BAR_WIDTH = 54;
const CHANGE_BAR_ARROW_HEIGHT = 9;
const CHANGE_CIRCLE_VALUE_OFFSET = 65;

const ChangeBarComponent = ({
  type,
  scales,
  margins,
  dimensions,
  position,
  height,
  value,
  legend,
  color,
  offset,
  connectingLines,
  displayLimitCircles = false,
  displayArrow = true,
  displayValueInCircle = false,
  displayOffsetBars = false,
  valueFormat = ',.1f'
}) => {
  if (!position) return null;

  const formattedValue = useMemo(() => {
    if (value % 1 === 0) return value;
    return format(valueFormat)(value);
  }, [value, valueFormat]);

  // Legend text, array due to multiline
  const legendItems = Array.isArray(legend) ? legend : [legend];

  // Calculating points to draw the arrow polygon
  // Note: It isn't quite an arrow, as we are building a little "rectangle" on top
  //       of the arrow, with 1px height, matching the above bar's width.
  //       This is to solve antialising issues, or there will be a faint line
  //       between the rectangle and the (triangle) polygon that displays the arrow.
  const arrowPoints = `
    ${position.x},${position.y + height - CHANGE_BAR_ARROW_HEIGHT - 1} 
    ${position.x + CHANGE_BAR_WIDTH},${position.y +
    height -
    CHANGE_BAR_ARROW_HEIGHT -
    1} 
    ${position.x + CHANGE_BAR_WIDTH},${position.y +
    height -
    CHANGE_BAR_ARROW_HEIGHT}
    ${position.x + CHANGE_BAR_WIDTH / 2},${position.y + height}
    ${position.x},${position.y + height - CHANGE_BAR_ARROW_HEIGHT}
  `;

  // Calculating connecting lines to a origin
  const connectingLinePaths = {
    upper: line()
      .x(d => scales.x(d.x))
      .y(d => scales.y(d.y))([
        { x: 2035, y: connectingLines?.upper?.value },
        {
          x: 2035 + connectingLines?.lower?.offset,
          y: connectingLines?.upper?.value
        }
      ]),
    lower: line()
      .x(d => scales.x(d.x))
      .y(d => scales.y(d.y))([
        { x: 2035, y: connectingLines?.lower?.value },
        {
          x: 2035 + connectingLines?.lower?.offset,
          y: connectingLines?.lower?.value
        }
      ])
  };

  return (
    <g transform={`translate(${-CHANGE_BAR_WIDTH / 2}, 0)`}>
      {/* Base bar display */}
      <RectComponent
        type={type}
        margins={margins}
        dimensions={dimensions}
        position={position}
        size={{
          width: CHANGE_BAR_WIDTH,
          height: displayArrow ? height - CHANGE_BAR_ARROW_HEIGHT : height
        }}
      />

      {/* Light offset bar displayed at the top */}
      {displayOffsetBars && (
        <RectComponent
          type="offset-bar"
          margins={margins}
          dimensions={dimensions}
          position={{
            x: position.x,
            y: position.y - offset
          }}
          size={{
            width: CHANGE_BAR_WIDTH,
            height: offset
          }}
          stroke={color}
        />
      )}

      {/* Lines connecting from bar ends to other points in the chart */}
      {connectingLines && (
        <g transform={`translate(${CHANGE_BAR_WIDTH / 2}, 0)`}>
          {connectingLines?.upper && (
            <LineComponent
              type="connecting-line"
              color={color}
              margins={margins}
              path={connectingLinePaths?.upper}
            />
          )}
          {connectingLines?.lower && (
            <LineComponent
              type="connecting-line"
              color={color}
              margins={margins}
              path={connectingLinePaths?.lower}
            />
          )}
        </g>
      )}

      {/* Arrow at the bottom of the bar */}
      {displayArrow && (
        <PolygonComponent
          margins={margins}
          points={arrowPoints}
          color={color}
        />
      )}

      {/* Circle above the component with the value */}
      {value && displayValueInCircle && (
        <>
          <CircleComponent
            type="emission-additional-reductions"
            margins={margins}
            position={{
              x: position.x + CHANGE_BAR_WIDTH / 2,
              y: position.y - CHANGE_CIRCLE_VALUE_OFFSET
            }}
          />
          <TextComponent
            type="value"
            value={formattedValue}
            margins={margins}
            dimensions={{
              width: CHANGE_BAR_WIDTH,
              height
            }}
            position={{
              x: position.x + CHANGE_BAR_WIDTH / 2,
              y: position.y - CHANGE_CIRCLE_VALUE_OFFSET - 4
            }}
          />
          <TextComponent
            type="unit"
            value="GtCO2e"
            margins={margins}
            dimensions={{
              width: CHANGE_BAR_WIDTH,
              height
            }}
            position={{
              x: position.x + CHANGE_BAR_WIDTH / 2,
              y: position.y - CHANGE_CIRCLE_VALUE_OFFSET + 18
            }}
          />
        </>
      )}

      {/* Value displayed inside the bar */}
      {value && !displayValueInCircle && (
        <>
          <TextComponent
            type="value"
            value={formattedValue}
            margins={margins}
            dimensions={{
              width: CHANGE_BAR_WIDTH,
              height
            }}
            position={{
              x: position.x + CHANGE_BAR_WIDTH / 2,
              y: -4 + position.y + height / 2
            }}
          />
          <TextComponent
            type="unit"
            value="GtCO2e"
            margins={margins}
            dimensions={{
              width: CHANGE_BAR_WIDTH,
              height
            }}
            position={{
              x: position.x + CHANGE_BAR_WIDTH / 2,
              y: 14 + position.y + height / 2
            }}
          />
        </>
      )}

      {/* Point markers displayed above and below the bar */}
      {displayLimitCircles && (
        <>
          <CircleComponent
            type="limit-marker"
            margins={margins}
            position={{
              x: position.x + CHANGE_BAR_WIDTH / 2,
              y: position.y
            }}
          />
          <CircleComponent
            type="limit-marker"
            margins={margins}
            position={{
              x: position.x + CHANGE_BAR_WIDTH / 2,
              y: position.y + height
            }}
          />
        </>
      )}

      {/* Legends shown below the bar */}
      {legendItems?.map((text, idx) => (
        <TextComponent
          type="legend"
          color={color}
          value={text}
          margins={margins}
          dimensions={{
            width: CHANGE_BAR_WIDTH,
            height
          }}
          position={{
            x: position.x + CHANGE_BAR_WIDTH / 2,
            y: 20 + position.y + height + idx * 16
          }}
        />
      ))}
    </g>
  );
};

ChangeBarComponent.propTypes = {
  type:
    'emission-reductions' ||
    'emission-additional-reductions' ||
    'type-upper-limit' ||
    'type-lower-limit',
  value: PropTypes.string,
  valueFormat: PropTypes.string,
  legend: PropTypes.string,
  color: PropTypes.string,
  offset: PropTypes.number,
  displayLimitCircles: PropTypes.bool,
  displayArrow: PropTypes.bool,
  displayValueInCircle: PropTypes.bool,
  displayOffsetBars: PropTypes.bool,
  height: PropTypes.number.isRequired,
  connectingLines: PropTypes.shape({
    upper: PropTypes.shape({
      value: PropTypes.number.isRequired,
      offset: PropTypes.number.isRequired
    }),
    lower: PropTypes.shape({
      value: PropTypes.number.isRequired,
      offset: PropTypes.number.isRequired
    })
  }),
  scales: PropTypes.shape({
    x: PropTypes.func.isRequired,
    y: PropTypes.func.isRequired
  }),
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }),
  margins: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired
  }),
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }).isRequired
};

export default ChangeBarComponent;
