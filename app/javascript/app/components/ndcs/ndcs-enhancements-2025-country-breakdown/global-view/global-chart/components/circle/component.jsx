import React from 'react';
import PropTypes from 'prop-types';

const typeStyles = {
  'emission-additional-reductions': {
    fill: '#0845CB',
    r: 45
  },
  'limit-marker': {
    fill: '#FFFFFF',
    stroke: '#999C9F',
    strokeWidth: 2,
    r: 4
  },
  historical: {
    fill: '#999C9F',
    r: 7
  },
  'upper-target': {
    fill: 'transparent',
    stroke: '#579B7D',
    strokeWidth: 3,
    r: 5
  },
  'lower-target': {
    fill: 'transparent',
    stroke: '#8CB73F',
    strokeWidth: 3,
    r: 5
  }
};

const CircleComponent = ({ type = 'historical', position, margins, tooltipId }) => {
  if (!position) return null;

  return (
    <circle
      transform={`translate(${margins?.left},${margins?.top})`}
      cx={position?.x}
      cy={position?.y}
      {...typeStyles[type]}
      data-tip
      data-for={tooltipId}
    />
  );
};

CircleComponent.propTypes = {
  type: 'limit-marker' || 'historical' || 'upper-target' || 'lower-target' || 'additional-emissions-reductions',
  tooltipId: PropTypes.string,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }).isRequired,
  margins: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired
  })
};

export default CircleComponent;
