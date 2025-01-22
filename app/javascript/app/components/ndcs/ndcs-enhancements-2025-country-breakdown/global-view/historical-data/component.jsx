import React from 'react';
import { line } from 'd3-shape';

import { chartConfigPropTypes } from '../index';
import { RectComponent, LineComponent, CircleComponent } from '../components';

const HistoricalDataComponent = ({ chartConfig = {} }) => {
  const { data, scales, dimensions, margins } = chartConfig;
  const historicalData = data?.historical;

  if (!historicalData || !scales || !dimensions || !margins) return null;

  const historicalEmissionsLinePath = line()
    .x((d) => scales.x(d.x))
    .y((d) => scales.y(d.y))(historicalData);

  const historicalEmissionsMarkerPosition = {
    x: scales.x(historicalData[historicalData.length - 1]?.x),
    y: scales.y(historicalData[historicalData.length - 1]?.y)
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
          height: dimensions?.height - margins?.top - margins?.bottom
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
  chartConfig: chartConfigPropTypes
};

export default HistoricalDataComponent;
