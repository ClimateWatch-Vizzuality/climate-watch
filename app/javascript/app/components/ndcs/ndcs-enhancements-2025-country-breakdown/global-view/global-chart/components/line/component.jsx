import React from 'react';
import PropTypes from 'prop-types';

const typeStyles = {
  historical: {
    fill: 'none',
    strokeWidth: '3'
  },
  projected: {
    fill: 'none',
    strokeDasharray: '5,5',
    strokeWidth: 3
  },
  'connecting-line': {
    fill: 'none',
    strokeDasharray: '2,2',
    strokeWidth: 0.5
  }
};

const LineComponent = ({ type = 'historical', color = '#999C9F', path, margins }) => {
  if (!path) return null;

  return (
    <path
      transform={`translate(${margins?.left},${margins?.top})`}
      className="line"
      d={path}
      {...typeStyles[type]}
      stroke={color}
    />
  );
};

LineComponent.propTypes = {
  type: 'historical' || 'projected' || 'connecting-line',
  color: PropTypes.string,
  path: PropTypes.any.isRequired,
  margins: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired
  })
};

export default LineComponent;
