import React from 'react';
import { line } from 'd3-shape';

import { chartConfigPropTypes } from '../index';
import { LineComponent } from '../components';

const ProjectedDataComponent = ({ chartConfig = {} }) => {
  const { data: allData, scales, margins } = chartConfig;
  const projectedData = allData?.projected;

  if (!projectedData || !scales || !margins) return null;

  const projectedEmissionsLinePath = line()
    .x(d => scales.x(d.x))
    .y(d => scales.y(d.y))(projectedData);

  return (
    <LineComponent
      type="projected"
      margins={margins}
      path={projectedEmissionsLinePath}
    />
  );
};

ProjectedDataComponent.propTypes = {
  chartConfig: chartConfigPropTypes
};

export default ProjectedDataComponent;
