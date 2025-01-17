import React from 'react';
import PropTypes from 'prop-types';

const typeStyles = {
  historical: {
    fill: 'none',
    stroke: '#999C9F',
    strokeWidth: '3'
  },
  projected: {
    fill: 'none',
    stroke: '#999C9F',
    strokeDasharray: '5,5',
    strokeWidth: 3
  }
};

const LineComponent = ({ type = 'historical', path, margins }) => {
  if (!path) return null;

  return (
    <path
      transform={`translate(${margins?.left},${margins?.top})`}
      className="line"
      d={path}
      {...typeStyles[type]}
    />
  );
};

LineComponent.propTypes = {
  type: 'historical' || 'projected',
  path: PropTypes.any.isRequired,
  margins: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired
  })
};

export default LineComponent;
