import React from 'react';
import PropTypes from 'prop-types';

const typeStyles = {
  'axis-x': {
    stroke: '#CCCCCC',
    strokeWidth: '0.5'
  },
  'axis-x-base': {
    stroke: '#000000',
    strokeDasharray: '4,4',
    strokeWidth: '0.5'
  }
};

const LineComponent = ({
  type = 'axis-x',
  color,
  path,
  margins,
  tooltipId
}) => {
  if (!path) return null;

  return (
    <path
      transform={`translate(${margins?.left},${margins?.top})`}
      className="line"
      d={path}
      {...typeStyles[type]}
      {...(color && { stroke: color })}
      data-tip
      data-for={tooltipId}
    />
  );
};

LineComponent.propTypes = {
  type: PropTypes.oneOf(['axis-x', 'axis-x-base']),
  tooltipId: PropTypes.string,
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
