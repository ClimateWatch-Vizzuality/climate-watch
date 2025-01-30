import React from 'react';
import PropTypes from 'prop-types';

const PolygonComponent = ({
  tooltipId,
  points,
  margins,
  color = '#999C9F'
}) => (
  <g transform={`translate(${margins?.left},${margins?.top})`}>
    <polygon points={points} fill={color} data-tip data-for={tooltipId} />
  </g>
);

PolygonComponent.propTypes = {
  tooltipId: PropTypes.string,
  color: PropTypes.string,
  points: PropTypes.string.isRequired,
  margins: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired
  }).isRequired
};

export default PolygonComponent;
