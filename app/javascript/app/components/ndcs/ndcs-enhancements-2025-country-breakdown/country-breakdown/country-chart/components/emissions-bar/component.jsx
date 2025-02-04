/* eslint-disable no-mixed-operators */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import RectComponent from '../rect';
import TextComponent from '../text';

const LABEL_OFFSET = 14;
const LABEL_HEIGHT = 20;
const LABEL_WIDTH = 60;

const EmissionsBarComponent = ({ type, scales, margins, dimensions, position, size, tooltipId, value }) => {
  if (!type || !scales || !margins || !dimensions || !size) return null;

  const displayValue = type === 2035;
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

  /* No target label positioning */
  const noTargetLabelPosition = useMemo(() => {
    const x = position.x + barWidth / 2 - 1;
    const y = scales.y(0) / 2;
    return { x, y };
  }, [size, dimensions, value, position]);

  const formattedValue = Math.round(value);
  const no2035Target = type === 2035 && !value;

  return (
    <g>
      {/* Bar display */}
      <RectComponent
        type={type}
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

      {/* No 2035 target */}
      {no2035Target && (
        <>
          <TextComponent
            type="no-target"
            value="No 2035"
            margins={margins}
            dimensions={{
              width: LABEL_WIDTH,
              height: LABEL_HEIGHT
            }}
            position={noTargetLabelPosition}
          />

          <TextComponent
            type="no-target"
            value="Target"
            margins={margins}
            dimensions={{
              width: LABEL_WIDTH,
              height: LABEL_HEIGHT
            }}
            position={{
              x: noTargetLabelPosition?.x,
              y: noTargetLabelPosition?.y + LABEL_HEIGHT - 2
            }}
          />
        </>
      )}
    </g>
  );
};

// TODO: Fix proptypes
EmissionsBarComponent.propTypes = {
  type: PropTypes.oneOf([2030, 2035]),
  margins: PropTypes.any,
  dimensions: PropTypes.any,
  scales: PropTypes.any,
  position: PropTypes.any,
  size: PropTypes.any,
  tooltipId: PropTypes.string,
  value: PropTypes.number
};

export default EmissionsBarComponent;
