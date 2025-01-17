import React from 'react';
import PropTypes from 'prop-types';
import { line } from 'd3-shape';

import { RectComponent, LineComponent, CircleComponent } from '../components';

const HistoricalDataComponent = ({ data, scales, dimensions, margins }) => {
  if (!data || !scales || !dimensions || !margins) return null;

  const historicalEmissionsLinePath = line()
    .x(d => scales.x(d.x))
    .y(d => scales.y(d.y))(data);

  const historicalEmissionsMarkerPosition = {
    x: scales.x(data[data.length - 1]?.x),
    y: scales.y(data[data.length - 1]?.y)
  };

  return (
    <>
      <RectComponent
        type="historical"
        margins={margins}
        dimensions={dimensions}
        position={{ x: 0, y: 0 }}
        size={{
          width: historicalEmissionsMarkerPosition.x,
          height: dimensions?.height - margins?.top - margins?.bottom,
        }}
      />
      <LineComponent
        type="historical"
        margins={margins}
        path={historicalEmissionsLinePath}
      />

      <CircleComponent
        margins={margins}
        position={historicalEmissionsMarkerPosition}
      />
    </>
  );
};

HistoricalDataComponent.propTypes = {
  data: PropTypes.any.isRequired,
  scales: PropTypes.shape({
    x: PropTypes.func.isRequired,
    y: PropTypes.func.isRequired
  }),
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }),
  margins: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired
  })
};

export default HistoricalDataComponent;
