import React from 'react';
import PropTypes from 'prop-types';

import CircleComponent from '../components/circle';

const TargetsComponent = ({ targets, margins, scales }) => {
  if (!scales || !targets) return null;

  return (
    <>
      <CircleComponent
        type="upper-target"
        margins={margins}
        position={{
          x: scales.x(2030),
          y: scales.y(targets[2030]['2.0C'])
        }}
      />
      <CircleComponent
        type="lower-target"
        margins={margins}
        position={{
          x: scales.x(2030),
          y: scales.y(targets[2030]['1.5C'])
        }}
      />
      <CircleComponent
        type="upper-target"
        margins={margins}
        position={{
          x: scales.x(2035),
          y: scales.y(targets[2035]['2.0C'])
        }}
      />
      <CircleComponent
        type="lower-target"
        margins={margins}
        position={{
          x: scales.x(2035),
          y: scales.y(targets[2035]['1.5C'])
        }}
      />
    </>
  );
};

TargetsComponent.propTypes = {
  targets: {
    2030: {
      '2.0C': PropTypes.number.isRequired,
      '1.5C': PropTypes.number.isRequired
    },
    2035: {
      '2.0C': PropTypes.number.isRequired,
      '1.5C': PropTypes.number.isRequired
    }
  },
  margins: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired
  })
};

export default TargetsComponent;
