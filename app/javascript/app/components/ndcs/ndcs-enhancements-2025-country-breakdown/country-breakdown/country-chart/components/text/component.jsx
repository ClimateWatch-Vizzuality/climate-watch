import React from 'react';
import PropTypes from 'prop-types';

const typeStyles = {
  value: {
    fontSize: 13,
    fill: '#000000'
  },
  'no-target': {
    fontSize: 13,
    fontStyle: 'italic'
  }
};

const TextComponent = ({ type = 'value', value, color, dimensions, position, margins, tooltipId }) => {
  if (!value || !margins || !position || !dimensions) return null;

  return (
    <text
      width={dimensions.width}
      height={dimensions.height}
      x={position.x}
      y={position.y}
      textAnchor="middle"
      dominantBaseline="middle"
      transform={`translate(${margins.left},${margins.top})`}
      fill={color}
      {...typeStyles[type]}
      data-tip
      data-for={tooltipId}
    >
      {value}
    </text>
  );
};

TextComponent.propTypes = {
  type: PropTypes.oneOf('value'),
  tooltipId: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
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
    x: PropTypes.number,
    y: PropTypes.number
  }).isRequired
};

export default TextComponent;
