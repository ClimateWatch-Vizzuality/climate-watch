import React from 'react';
import PropTypes from 'prop-types';

const typeStyles = {
  2030: {
    fill: '#CCCDCF'
  },
  2035: {
    fill: '#83A2E5'
  }
};

const RectComponent = ({
  type = 2030,
  tooltipId,
  margins,
  dimensions,
  position,
  size,
  stroke
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
      {...typeStyles[type]}
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
