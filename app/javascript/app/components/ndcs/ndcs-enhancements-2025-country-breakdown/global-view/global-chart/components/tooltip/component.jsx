import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import styles from './styles.scss';

const TooltipComponent = ({ id, label, value }) => {
  if (!id) return null;

  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      ReactTooltip.rebuild();
    } else {
      didMountRef.current = true;
    }
  });
  return (
    <ReactTooltip id={id} className={styles.globalChartTooltipTheme}>
      <div className={styles.globalChartTooltip}>
        {label && (
          <span className={styles.globalChartTooltipLabel}>{label}</span>
        )}
        {value && (
          <span className={styles.globalChartTooltipValue}>{value}</span>
        )}
      </div>
    </ReactTooltip>
  );
};

TooltipComponent.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string
};

export default TooltipComponent;
