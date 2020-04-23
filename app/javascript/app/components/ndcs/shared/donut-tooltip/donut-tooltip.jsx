import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styles from './donut-tooltip-styles.scss';

const DonutTooltip = props => {
  const {
    reference,
    chartReference,
    content: { payload, coordinate },
    itemName
  } = props;
  if (!payload || !payload[0]) return null;

  const percentage = parseFloat(Math.round(payload[0].value * 10)) / 10;
  const legendItemName = payload[0].name;

  const chartTop = chartReference && chartReference.getBoundingClientRect().top;
  const referenceTop = reference.getBoundingClientRect().top;

  const DEFAULT_OFFSET = 210; // If the parent reference is not loaded
  const top = chartTop
    ? chartTop - referenceTop + coordinate.y
    : DEFAULT_OFFSET + coordinate.y;

  // Avoid covering the label on the center
  const left = coordinate.x > 40 ? coordinate.x + 80 : coordinate.x;
  return ReactDOM.createPortal(
    <div className={styles.tooltip} style={{ left, top }}>
      {`${itemName} with `}
      <span className={styles.legendItem}>{legendItemName}</span>
      {` represent ${percentage}% of global GHG emissions`}
    </div>,
    reference
  );
};

DonutTooltip.propTypes = {
  content: PropTypes.object,
  reference: PropTypes.object,
  chartReference: PropTypes.object,
  itemName: PropTypes.string
};

DonutTooltip.defaultProps = {
  itemName: 'Countries'
};

export default DonutTooltip;
