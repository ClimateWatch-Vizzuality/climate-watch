import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import TextComponent from '../text';

const LABEL_HEIGHT = 20;
const LABEL_WIDTH = 60;

const MessagesComponent = ({
  messages,
  size,
  dimensions,
  position,
  scales,
  margins
}) => {
  /* No target label positioning */
  const noTargetLabelPosition = useMemo(() => {
    const x = position.x + size?.width - 1;
    const y = Math.max(60, scales.y(0) / 2);
    return { x, y };
  }, [size, dimensions, position, scales]);

  return messages.map((message, index) => (
    <TextComponent
      type="no-target"
      value={message}
      margins={margins}
      dimensions={{
        width: LABEL_WIDTH,
        height: LABEL_HEIGHT
      }}
      position={{
        x: noTargetLabelPosition?.x,
        y:
          noTargetLabelPosition?.y +
          (LABEL_HEIGHT - 2) * index -
          (messages.length / 2) * (LABEL_HEIGHT - 2)
      }}
    />
  ));
};

MessagesComponent.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  margins: PropTypes.any,
  dimensions: PropTypes.any,
  scales: PropTypes.any,
  position: PropTypes.any,
  size: PropTypes.any
};

export default MessagesComponent;
