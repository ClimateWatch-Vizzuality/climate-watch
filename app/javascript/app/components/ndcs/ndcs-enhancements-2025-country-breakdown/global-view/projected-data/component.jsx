import React from 'react';
import PropTypes from 'prop-types';
import { line } from 'd3-shape';

import { LineComponent } from '../components';

const ProjectedDataComponent = ({ data, scales, margins }) => {
  if (!data || !scales || !margins) return null;

  const projectedEmissionsLinePath = line()
    .x((d) => scales.x(d.x))
    .y((d) => scales.y(d.y))(data);

  return (
    <LineComponent
      type="projected"
      margins={margins}
      path={projectedEmissionsLinePath}
    />
  );
};

ProjectedDataComponent.propTypes = {
  data: PropTypes.any.isRequired,
  scales: PropTypes.shape({
    x: PropTypes.func.isRequired,
    y: PropTypes.func.isRequired
  }),
  margins: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired
  })
};

export default ProjectedDataComponent;
