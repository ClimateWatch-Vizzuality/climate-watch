/* eslint-disable no-mixed-operators */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import RectComponent from '../rect';
import TextComponent from '../text';

const LABEL_OFFSET = 14;
const LABEL_HEIGHT = 20;

const EmissionsBarComponent = ({
  year,
  color,
  scales,
  margins,
  dimensions,
  position,
  size,
  tooltipId,
  value
}) => {
  if (!year || !scales || !margins || !dimensions || !size) return null;

  const displayValue = year === 2035;
  const barWidth = size?.width;

  /* Label with values positioning */
  const labelPosition = useMemo(() => {
    const displayValueBelow = value < 0;
    const x = position.x + barWidth - 1;
    const y = displayValueBelow
      ? position.y + size.height + LABEL_OFFSET
      : position.y - LABEL_OFFSET;

    return { x, y };
  }, [size, dimensions, value, position]);

  const formattedValue = Math.round(value);

  return (
    <g>
      {/* Bar display */}
      <RectComponent
        type={year}
        color={color}
        margins={margins}
        dimensions={dimensions}
        position={position}
        size={size}
        tooltipId={tooltipId}
      />

      {/* Value above or below the bar */}
      {displayValue && (
        <TextComponent
          type="value"
          value={formattedValue}
          margins={margins}
          dimensions={{
            width: barWidth,
            height: LABEL_HEIGHT
          }}
          position={labelPosition}
        />
      )}
    </g>
  );
};

EmissionsBarComponent.propTypes = {
  year: PropTypes.oneOf([2030, 2035]),
  color: PropTypes.string,
  margins: PropTypes.any,
  dimensions: PropTypes.any,
  scales: PropTypes.any,
  position: PropTypes.any,
  size: PropTypes.any,
  tooltipId: PropTypes.string,
  value: PropTypes.number
};

export default EmissionsBarComponent;
