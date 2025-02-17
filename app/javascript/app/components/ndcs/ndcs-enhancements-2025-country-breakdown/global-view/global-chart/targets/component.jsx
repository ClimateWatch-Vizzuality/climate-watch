import React from 'react';

import { chartConfigPropTypes } from '../../index';
import { CircleComponent } from '../components';
import { TOOLTIPS } from '../constants';

const TargetsComponent = ({ chartConfig = {} }) => {
  const { data: allData, margins, scales } = chartConfig;
  const targetsData = allData?.targets;
  if (!targetsData || !scales) return null;

  return (
    <>
      <CircleComponent
        type="upper-target"
        margins={margins}
        position={{
          x: scales.x(2035),
          y: scales.y(targetsData[2035]['2.0C'])
        }}
        tooltipId={TOOLTIPS.targets[2035]['2.0C'].id}
      />
      <CircleComponent
        type="lower-target"
        margins={margins}
        position={{
          x: scales.x(2035),
          y: scales.y(targetsData[2035]['1.5C'])
        }}
        tooltipId={TOOLTIPS.targets[2035]['1.5C'].id}
      />
    </>
  );
};

TargetsComponent.propTypes = {
  chartConfig: chartConfigPropTypes
};

export default TargetsComponent;
