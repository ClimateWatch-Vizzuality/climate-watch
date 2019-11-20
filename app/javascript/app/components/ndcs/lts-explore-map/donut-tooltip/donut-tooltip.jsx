import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styles from './donut-tooltip-styles.scss';

const DonutTooltip = props => {
  const {
    reference,
    content: { payload, coordinate }
  } = props;

  return payload && payload[0]
    ? ReactDOM.createPortal(
      <div
        className={styles.tooltip}
        style={{ left: coordinate.x + 100, top: coordinate.y }}
      >
        {`Parties with ${'indicator'} represent ${
          payload[0].value
        } of global emissions`}
      </div>,
      reference
    )
    : null;
};

DonutTooltip.propTypes = {
  content: PropTypes.object
};

export default DonutTooltip;
