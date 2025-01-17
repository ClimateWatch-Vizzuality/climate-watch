/* eslint-disable no-mixed-operators */
import React from 'react';
import PropTypes from 'prop-types';

import RectComponent from '../rect';
import PolygonComponent from '../polygon';
import TextComponent from '../text';
import CircleComponent from '../circle';

const CHANGE_BAR_WIDTH = 54;
const CHANGE_BAR_ARROW_HEIGHT = 10;
const CHANGE_CIRCLE_VALUE_OFFSET = 65;

const ChangeBarComponent = ({
  type,
  margins,
  dimensions,
  position,
  height,
  value,
  legend,
  color,
  displayLimitCircles = false,
  displayArrow = true,
  displayValueInCircle = false
}) => {
  if (!position) return null;

  const legendItems = Array.isArray(legend) ? legend : [legend];

  const arrowPoints = `${position.x},${position.y +
    height -
    CHANGE_BAR_ARROW_HEIGHT}
     ${position.x + CHANGE_BAR_WIDTH},${position.y +
    height -
    CHANGE_BAR_ARROW_HEIGHT}
      ${position.x + CHANGE_BAR_WIDTH / 2},${position.y + height}`;

  return (
    <g transform={`translate(${-CHANGE_BAR_WIDTH / 2}, 0)`}>
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
      {displayArrow && (
        <PolygonComponent
          margins={margins}
          points={arrowPoints}
          color={color}
        />
      )}
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
            type="value-big"
            value={value}
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
      {value && !displayValueInCircle && (
        <>
          <TextComponent
            type="value"
            value={value}
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
  legend: PropTypes.string,
  color: PropTypes.string,
  displayLimitCircles: PropTypes.bool,
  displayArrow: PropTypes.bool,
  displayValueInCircle: PropTypes.bool,
  height: PropTypes.number.isRequired,
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
