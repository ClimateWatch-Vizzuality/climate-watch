import React from 'react';
import PropTypes from 'prop-types';

const RectComponent = ({
  type = 2030,
  tooltipId,
  margins,
  dimensions,
  position,
  size,
  stroke,
  color
}) => {
  if (!margins || !dimensions || !position || !size) return null;

  const translationX = type === 2030 ? -(size.width / 2) : size.width / 2;

  return (
    <rect
      transform={`translate(${margins?.left + translationX},${margins?.top})`}
      width={size?.width}
      height={size?.height}
      x={position?.x}
      y={position?.y}
      fill={color}
      stroke={stroke}
      data-tip
      data-for={tooltipId}
    />
  );
};

RectComponent.propTypes = {
  type: PropTypes.oneOf([2030, 2035]),
  tooltipId: PropTypes.string,
  stroke: PropTypes.string,
  color: PropTypes.string,
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
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }).isRequired
};

export default RectComponent;
