import React from 'react';
import PropTypes from 'prop-types';

const typeStyles = {
  historical: {
    fill: '#D9D9D9',
    fillOpacity: '11%'
  },
  'emission-reductions': {
    fill: '#999C9F'
  },
  'emission-additional-reductions': {
    fill: '#0845CB'
  },
  'gap-upper-limit': {
    fill: '#579B7D'
  },
  'gap-lower-limit': {
    fill: '#8CB73F'
  },
  'offset-bar': {
    fill: '#D9D9D9',
    fillOpacity: '11%',
    strokeDasharray: '2,2',
    strokeWidth: 0.5
  }
};

const RectComponent = ({
  type = 'historical',
  margins,
  dimensions,
  position,
  size,
  stroke
}) => {
  if (!margins || !dimensions || !position || !size) return null;

  return (
    <rect
      transform={`translate(${margins?.left},${margins?.top})`}
      width={size?.width}
      height={size?.height}
      x={position?.x}
      y={position?.y}
      {...typeStyles[type]}
      stroke={stroke}
    />
  );
};

RectComponent.propTypes = {
  type:
    'historical' ||
    'emission-reductions' ||
    'emission-additional-reductions' ||
    'gap-upper-limit' ||
    'gap-lower-limit' ||
    'offset-bar',
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
