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
    content: { payload, coordinate },
    data
  } = props;
  if (!payload || !payload[0]) return null;

  const total = Object.values(data).reduce((acc, d) => acc + d.value, 0);
  const percentage = Math.round((payload[0].value * 100) / total);

  const legendItemName = capitalize(lowerCase(payload[0].name));

  const chartTop = chartReference.getBoundingClientRect().top;
  const referenceTop = reference.getBoundingClientRect().top;
  let top = chartTop - referenceTop + coordinate.y;

  // Avoid covering the label on the center
  const left = coordinate.x > 40 ? coordinate.x + 80 : coordinate.x;
  if (top < 340 && left < 190) top += 80;
  return ReactDOM.createPortal(
    <div className={styles.tooltip} style={{ left, top }}>
      {`Parties with ${legendItemName} represent ${percentage}% of global emissions`}
    </div>,
    reference
  );
};

DonutTooltip.propTypes = {
  content: PropTypes.object
};

export default DonutTooltip;
