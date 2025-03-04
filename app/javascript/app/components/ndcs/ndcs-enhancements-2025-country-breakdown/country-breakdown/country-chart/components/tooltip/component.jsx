import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import styles from './styles.scss';

const TooltipComponent = ({ id, country, label, value, color = '#000000' }) => {
  if (!id || !value) return null;

  return (
    <div className={styles.countryChartTooltipWrapper}>
      <ReactTooltip id={id} className={styles.countryChartTooltipTheme}>
        <div className={styles.countryChartTooltip}>
          <span className={styles.countryChartTooltipCountry}>{country}</span>
          <span className={styles.countryChartTooltipLabel} style={{ color }}>
            {label}
          </span>
          <span className={styles.countryChartTooltipValue} style={{ color }}>
            {value}
          </span>
        </div>
      </ReactTooltip>
    </div>
  );
};

TooltipComponent.propTypes = {
  id: PropTypes.string.isRequired,
  country: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  color: PropTypes.string
};

export default TooltipComponent;
