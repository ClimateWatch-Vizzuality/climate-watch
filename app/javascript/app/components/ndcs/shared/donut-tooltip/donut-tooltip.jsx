import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import lowerCase from 'lodash/lowerCase';
import capitalize from 'lodash/capitalize';
import styles from './donut-tooltip-styles.scss';

const DonutTooltip = props => {
  const {
    reference,
    chartReference,
    content: { payload, coordinate }
  } = props;
  if (!payload || !payload[0]) return null;

  const percentage = parseFloat(Math.round(payload[0].value * 10)) / 10;

  const legendItemName = capitalize(lowerCase(payload[0].name));

  const chartTop = chartReference.getBoundingClientRect().top;
  const referenceTop = reference.getBoundingClientRect().top;
  let top = chartTop - referenceTop + coordinate.y;

  // Avoid covering the label on the center
  const left = coordinate.x > 40 ? coordinate.x + 80 : coordinate.x;
  if (top < 340 && left < 190) top += 80;
  return ReactDOM.createPortal(
    <div className={styles.tooltip} style={{ left, top }}>
      {`Countries with ${legendItemName} represent ${percentage}% of global emissions`}
    </div>,
    reference
  );
};

DonutTooltip.propTypes = {
  content: PropTypes.object,
  reference: PropTypes.object,
  chartReference: PropTypes.object
};

export default DonutTooltip;
